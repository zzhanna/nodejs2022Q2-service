import { validate as uuidValidate } from 'uuid';
import { db } from 'src/database/db';
import { HttpException } from '@nestjs/common';
import { IUser } from '../interface/interface';

export const userByValidId = (id: string): IUser => {
  if (uuidValidate(id)) {
    const userById = db.users.find((user) => user.id === id);
    if (!userById) {
      throw new HttpException(`User with id = ${id} not found`, 404);
    } else return userById;
  } else {
    throw new HttpException(`Id is invalid (not uuid)`, 400);
  }
};
