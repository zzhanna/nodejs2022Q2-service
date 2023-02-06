import { validate as uuidValidate } from 'uuid';
import { db } from 'src/database/db';
import { HttpException } from '@nestjs/common';
import { IAlbum } from '../../interface/interface';

export const albumByValidId = (id: string): IAlbum => {
  if (uuidValidate(id)) {
    const albumById = db.albums.find((album) => album.id === id);
    if (!albumById) {
      throw new HttpException(`ALbum with id = ${id} not found`, 404);
    } else return albumById;
  } else {
    throw new HttpException(`Id is invalid (not uuid)`, 400);
  }
};
