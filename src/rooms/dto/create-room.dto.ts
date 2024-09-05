import { IsString, IsNumber, IsUrl } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  location: string;

  @IsUrl()
  image_url: string;
}
