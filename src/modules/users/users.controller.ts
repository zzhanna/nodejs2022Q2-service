import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser, IUserForResponce } from '../interface/interface';
import { CreateUserDto, UpdatePasswordDto } from './dto/users-dto';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<IUser[]> {
    return await this.usersService.getAll();
  }
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<IUser> {
    return await this.usersService.getById(id);
  }

  @Post()
  async createNewUser(
    @Body() dataUser: CreateUserDto,
  ): Promise<IUserForResponce> {
    return await this.usersService.createUser(dataUser);
  }

  @Put(':id')
  async updateUserPassword(
    @Param('id') id: string,
    @Body() dataUser: UpdatePasswordDto,
  ) {
    return await this.usersService.updatePassword(id, dataUser);
  }
  @Delete(':id')
  @HttpCode(204)
  async deleteUserById(@Param('id') id: string) {
    return await this.usersService.deleteUser(id);
  }
}
