import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './rooms/room.module';
// import { BookingModule } from './bookings/booking.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const config = {
          type: 'postgres' as const,
          url: configService.get<string>('DB_URL'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true, // Set to false in production
          ssl: {
            rejectUnauthorized: false,
          },
        };

        try {
          console.log('Attempting to connect to the database...');
          const dataSource = new DataSource(config);
          await dataSource.initialize();
          console.log('Database connection successful!');
          await dataSource.destroy();
          return config;
        } catch (error) {
          console.error('Database connection failed:', error.message);
          throw error;
        }
      },
      inject: [ConfigService],
    }),
    RoomModule,
    // BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}