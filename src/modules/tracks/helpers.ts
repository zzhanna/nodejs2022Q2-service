import { validate as uuidValidate } from 'uuid';
import { db } from 'src/database/db';
import { HttpException } from '@nestjs/common';
import { ITrack } from '../../interface/interface';

export const trackByValidId = (id: string): ITrack => {
  if (uuidValidate(id)) {
    const trackById = db.tracks.find((track) => track.id === id);
    if (!trackById) {
      throw new HttpException(`Track with id = ${id} not found`, 404);
    } else return trackById;
  } else {
    throw new HttpException(`Id is invalid (not uuid)`, 400);
  }
};
