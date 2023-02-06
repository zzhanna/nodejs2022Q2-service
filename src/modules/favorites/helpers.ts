import { validate as uuidValidate } from 'uuid';
import { db } from 'src/database/db';
import { HttpException } from '@nestjs/common';

export const typeByValidId = (id: string, type: string) => {
  if (uuidValidate(id)) {
    const typeById = db[`${type}s`].find((el: { id: string }) => el.id === id);
    console.log(db[`${type}s`]);
    console.log(typeById);
    if (!typeById) {
      throw new HttpException(`${type} with id = ${id} not found`, 422);
    } else return typeById;
  } else {
    throw new HttpException(`Id is invalid (not uuid)`, 400);
  }
};
