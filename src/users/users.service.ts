import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getAll() {
    return `return all user`;
  }
  getById(id: string) {
    return `return user with id = ${id}`;
  }

  createUser() {
    return `create new user`;
  }

  updatePassword() {
    return `update users password`;
  }

  deleteUser(id: string) {
    return `delete user with id = ${id}`;
  }
}
