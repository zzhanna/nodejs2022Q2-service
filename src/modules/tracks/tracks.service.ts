import { HttpException, Injectable } from '@nestjs/common';
//import { Inject } from '@nestjs/common/decorators';
import { db } from '../../database/db';
import { CreateTrackDto, UpdateTrackDto } from './dto/tracks-dto';
import { trackByValidId } from './helpers';
import { v4 } from 'uuid';
import { ITrack } from '../../interface/interface';
//import { ArtistsService } from '../artists/artists.service';

@Injectable()
export class TracksService {
  // constructor(
  //   @Inject(forwardRef(() => ArtistsService))
  //   private readonly artistService: ArtistsService,
  // ) {}

  getAll() {
    return db.tracks;
  }
  async getById(id: string) {
    const trackById = await trackByValidId(id);
    const response = { ...trackById };
    return response;
  }

  createTrack({ name, artistId, albumId, duration }: CreateTrackDto): ITrack {
    if (
      name &&
      !artistId &&
      artistId !== null &&
      !albumId &&
      albumId !== null &&
      duration
    )
      throw new HttpException(
        'Request body does not contain name, artistId, albumId, duration, fields',
        400,
      );

    const newTrack = {
      id: v4(),
      name,
      duration,
      artistId: null,
      albumId: null,
    };

    // if (artistId) {
    //   const isArtist = this.artistService.getArtistById(artistId);
    //   if (isArtist) newTrack.artistId = artistId;
    // }

    db.tracks.push(newTrack);
    return newTrack;
  }

  async updateTrack(id: string, { name, duration }: UpdateTrackDto) {
    if (name && duration) {
      const findTrackById = await trackByValidId(id);
      findTrackById.name = name;
      findTrackById.duration = duration;
      return findTrackById;
    } else {
      throw new HttpException('Bad request', 400);
    }
  }

  async deleteTrack(id: string) {
    const trackById = await trackByValidId(id);
    if (trackById) {
      db.tracks = db.tracks.filter((track) => track.id !== id);
    } else throw new HttpException('Bad request', 404);
  }
}
