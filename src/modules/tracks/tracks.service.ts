import { forwardRef, HttpException, Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { db } from '../../database/db';
import { CreateTrackDto, UpdateTrackDto } from './dto/tracks-dto';
import { trackByValidId } from './helpers';
import { v4 } from 'uuid';
import { ITrack } from '../../interface/interface';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from './../albums/albums.service';

@Injectable()
export class TracksService {
  constructor(
    @Inject(forwardRef(() => ArtistsService))
    private artistService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private albumService: AlbumsService,
  ) {}

  getAll() {
    return db.tracks;
  }
  getTrackById(id: string) {
    const trackById = trackByValidId(id);
    return trackById;
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

    if (artistId) {
      const isArtist = this.artistService.getArtistById(artistId);
      if (isArtist) newTrack.artistId = artistId;
    }

    if (albumId) {
      const isAlbum = this.albumService.getAlbumById(albumId);
      if (isAlbum) {
        newTrack.albumId = albumId;
      }
    }
    db.tracks.push(newTrack);
    console.log(db);
    return newTrack;
  }

  updateTrack(id: string, { name, duration }: UpdateTrackDto) {
    if (name && duration) {
      const findTrackById = trackByValidId(id);
      findTrackById.name = name;
      findTrackById.duration = duration;
      return findTrackById;
    } else {
      throw new HttpException('Bad request', 400);
    }
  }

  deleteTrack(id: string) {
    const trackById = trackByValidId(id);
    if (trackById) {
      db.tracks = db.tracks.filter((track) => track.id !== id);
    } else throw new HttpException('Bad request', 404);
  }
}
