import { HttpException, Injectable } from '@nestjs/common';
import { db } from 'src/database/db';
import { artistByValidId } from './helpers';
import { CreateArtistDto, UpdateArtistDto } from './dto/artists-dto';
import { IArtist } from '../interface/interface';
import { v4 } from 'uuid';

@Injectable()
export class ArtistsService {
  getAll() {
    return db.artists;
  }
  async getArtistById(id: string) {
    const artistById = await artistByValidId(id);
    return artistById;
  }

  createArtist(dataArtist: CreateArtistDto): IArtist {
    if (dataArtist.name && dataArtist.grammy) {
      const { name, grammy } = dataArtist;
      const newArtist = {
        id: v4(),
        name,
        grammy,
      };
      db.artists.push(newArtist);
      return newArtist;
    } else
      throw new HttpException(
        'Request body does not contain  name or grammy fields',
        400,
      );
  }
  async updateArtist(id: string, body: UpdateArtistDto) {
    const { name, grammy } = body;
    if (
      (name && typeof name === 'string') ||
      (grammy && typeof grammy === 'boolean')
    ) {
      let findTrackById = await artistByValidId(id);
      findTrackById = { ...findTrackById, ...body };
      return findTrackById;
    } else {
      throw new HttpException('Bad request', 400);
    }
  }

  async deleteArtist(id: string) {
    const artistById = await artistByValidId(id);
    if (artistById) {
      db.artists = db.artists.filter((artist) => artist.id !== id);
      await db.tracks.forEach((track) => {
        if (track.artistId === id) {
          track.artistId = null;
        }
      });
      return;
    } else throw new HttpException('Bad request', 404);
  }
}
