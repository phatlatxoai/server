import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('api/rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get(':id')
  async getRoom(@Param('id') id: string) {
    return this.roomService.findOne(id);
  }

  @Post()
  async createRoom(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Put(':id')
  async updateRoom(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(id, updateRoomDto);
  }

  @Delete(':id')
  async deleteRoom(@Param('id') id: string) {
    return this.roomService.remove(id);
  }

  @Get()
  async getAllRooms(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    page = Number(page);
    limit = Number(limit);
    return this.roomService.findAll(page, limit);
  }
}
