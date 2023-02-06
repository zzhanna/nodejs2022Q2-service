import { validate as uuidValidate, version } from 'uuid';
import { db } from 'src/database/db';
import { HttpException } from '@nestjs/common';

export const typeByValidId = (id: string, type: string) => {
  if (uuidValidate(id) && version(id) === 4) {
    const typeById = db[`${type}s`].find((el: { id: string }) => el.id === id);
    if (!typeById) {
      throw new HttpException(`${type} with id = ${id} not found`, 422);
    } else return typeById;
  } else {
    throw new HttpException(`Id is invalid (not uuid)`, 400);
  }
};

export const deleteByValidId = (id: string, type: string) => {
  if (uuidValidate(id) && version(id) === 4) {
    const typeById = db.favorites[`${type}s`].find((el: string) => el === id);
    if (!typeById) {
      throw new HttpException(
        `${type} with id = ${id} not found in favorites`,
        404,
      );
    } else return typeById;
  } else {
    throw new HttpException(`Id is invalid (not uuid)`, 400);
  }
};
