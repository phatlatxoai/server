import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './interfaces/room.interface';

@Injectable()
export class RoomService {
  private rooms: Room[] = [];

  create(createRoomDto: CreateRoomDto): Room {
    const newRoom: Room = {
      id: Date.now().toString(),
      ...createRoomDto,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.rooms.push(newRoom);
    return newRoom;
  }

  findAll(page: number = 1, limit: number = 10): { rooms: Room[], total: number, page: number, limit: number } {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = this.rooms.length;
    const paginatedRooms = this.rooms.slice(startIndex, endIndex);

    return {
      rooms: paginatedRooms,
      total,
      page,
      limit
    };
  }

  findOne(id: string): Room {
    const room = this.rooms.find(room => room.id === id);
    if (!room) throw new NotFoundException(`Room with ID ${id} not found`);
    return room;
  }

  update(id: string, updateRoomDto: UpdateRoomDto): Room {
    const roomIndex = this.rooms.findIndex(room => room.id === id);
    if (roomIndex === -1) throw new NotFoundException(`Room with ID ${id} not found`);
    this.rooms[roomIndex] = {
      ...this.rooms[roomIndex],
      ...updateRoomDto,
      updated_at: new Date(),
    };
    return this.rooms[roomIndex];
  }

  remove(id: string): { message: string } {
    const roomIndex = this.rooms.findIndex(room => room.id === id);
    if (roomIndex === -1) throw new NotFoundException(`Room with ID ${id} not found`);
    this.rooms.splice(roomIndex, 1);
    return { message: 'Room deleted successfully' };
  }
}
