import { HttpException, Injectable } from '@nestjs/common';
import { db } from 'src/database/db';
import { CreateTrackDto, UpdateTrackDto } from './dto/tracks-dto';
import { trackByValidId } from 'src/tracks/helpers';
import { v4 } from 'uuid';
import { ITrack } from './../../dist/interface/interface.d';

@Injectable()
export class TracksService {
  getAll() {
    return db.tracks;
  }
  async getById(id: string) {
    const trackById = await trackByValidId(id);
    const response = { ...trackById };
    return response;
  }

  createUser(dataTrack: CreateTrackDto): ITrack {
    if (
      dataTrack.name &&
      dataTrack.artistId &&
      dataTrack.albumId &&
      dataTrack.duration
    ) {
      const { name, artistId, albumId, duration } = dataTrack;
      const newTrack = {
        id: v4(),
        name,
        artistId,
        albumId: null,
        duration: null,
      };

      const response = { ...newTrack };
      return response;
    } else
      throw new HttpException(
        'Request body does not contain name, artistId, albumId, duration, fields',
        400,
      );
  }
  async updatePassword(id: string, body: UpdateTrackDto) {
    const { name, artistId, albumId, duration } = body;
    if (name && artistId && albumId && duration) {
      const findTrackById = await trackByValidId(id);
      findTrackById.name = name;
      findTrackById.albumId = artistId;
      findTrackById.albumId = albumId;

      return findTrackById;
    } else {
      throw new HttpException('Bad request', 400);
    }
  }

  async deleteUser(id: string) {
    const trackById = await trackByValidId(id);
    if (trackById) {
      db.tracks = db.tracks.filter((track) => track.id !== id);
    } else throw new HttpException('Bad request', 404);
  }
}
