import { Controller, HttpCode, Get, Post, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../interface/interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  async getAllUsers(): Promise<User[] | string> {
    return await this.usersService.getAll();
  }

  @Get(':id')
  @HttpCode(200)
  async getUserById(id: string): Promise<User | string> {
    return await this.usersService.getById(id);
  }

  @Post()
  @HttpCode(201)
  async createNewUser() {
    return await this.usersService.createUser();
  }

  @Put()
  @HttpCode(200)
  async updateUserPassword() {
    return await this.usersService.updatePassword();
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUserById(id: string) {
    return await this.usersService.deleteUser(id);
  }
}
