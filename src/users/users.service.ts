import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './dto/users-dto';
import { db } from 'src/database/db';
import { IUserForResponce } from 'src/interface/interface';
import { v4 } from 'uuid';
import { userByValidId } from './helpers';

@Injectable()
export class UsersService {
  getAll() {
    return db.users;
  }
  async getById(id: string) {
    const userById = await userByValidId(id);
    const response = { ...userById };
    delete response.password;
    return response;
  }

  createUser(dataUser: CreateUserDto): IUserForResponce {
    const time = new Date().getTime();
    if (dataUser.login && dataUser.password) {
      const { login, password } = dataUser;
      const newUser = {
        login,
        password,
        id: v4(),
        version: 1,
        createdAt: time,
        updatedAt: time,
      };
      db.users.push(newUser);
      const response = { ...newUser };
      delete response.password;
      return response;
    } else
      throw new HttpException(
        'Request body does not contain login or password fields',
        400,
      );
  }
  async updatePassword(id: string, body: UpdatePasswordDto) {
    const { oldPassword, newPassword } = body;
    if (oldPassword && newPassword) {
      const findUserById = await userByValidId(id);
      if (oldPassword !== findUserById.password)
        throw new HttpException('Old password invalid', 403);

      findUserById.password = newPassword;
      findUserById.version += 1;
      findUserById.updatedAt = new Date().getTime();
      const response = { ...findUserById };
      delete response.password;
      return response;
    } else {
      throw new HttpException('Bad request', 400);
    }
  }

  async deleteUser(id: string) {
    const userById = await userByValidId(id);
    if (userById) {
      db.users = db.users.filter((user) => user.id !== id);
    } else throw new HttpException('Bad request', 404);
  }
}
