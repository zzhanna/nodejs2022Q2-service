import { validate as uuidValidate } from 'uuid';
import { db } from 'src/database/db';
import { HttpException } from '@nestjs/common';
import { IArtist } from '../../interface/interface';

export const artistByValidId = (id: string): IArtist => {
  if (uuidValidate(id)) {
    const artistById = db.artists.find((artist) => artist.id === id);
    if (!artistById) {
      throw new HttpException(`Artist with id = ${id} not found`, 404);
    } else return artistById;
  } else {
    throw new HttpException(`Id is invalid (not uuid)`, 400);
  }
};
