import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { db } from '../../database/db';
import { IAlbum } from '../../interface/interface';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/albums-dto';
import { albumByValidId } from './helpers';
import { ArtistsService } from '../artists/artists.service';

@Injectable()
export class AlbumsService {
  constructor(
    @Inject(forwardRef(() => ArtistsService))
    private artistService: ArtistsService,
  ) {}
  getAll() {
    return db.albums;
  }
  getAlbumById(id: string) {
    const albumById = albumByValidId(id);
    return albumById;
  }

  async createAlbum(dataAlbum: CreateAlbumDto): Promise<IAlbum> {
    if (!dataAlbum.name || !dataAlbum.year)
      throw new HttpException(
        'Request body does not contain  name or year fields',
        400,
      );
    if (dataAlbum.name && dataAlbum.year) {
      const { name, year, artistId } = dataAlbum;
      const newAlbum = {
        id: v4(),
        name,
        year,
        artistId: null,
      };
      if (artistId) {
        const isArtist = this.artistService.getArtistById(artistId);
        if (isArtist) {
          newAlbum.artistId = artistId;
        }
      }

      db.albums.push(newAlbum);
      return newAlbum;
    } else throw new HttpException('Invalid requests', 400);
  }
  updateAlbum(id: string, body: UpdateAlbumDto) {
    const { name, year } = body;
    if (
      (name && typeof name === 'string') ||
      (year && typeof year === 'number')
    ) {
      let findTrackById = albumByValidId(id);
      findTrackById = { ...findTrackById, ...body };
      return findTrackById;
    } else {
      throw new HttpException('Bad request', 400);
    }
  }

  deleteAlbum(id: string) {
    const albumById = albumByValidId(id);
    if (albumById) {
      db.albums = db.albums.filter((album) => album.id !== id);
      db.tracks.forEach((track) => {
        if (track.artistId === id) {
          track.artistId = null;
        }
        if (track.albumId === id) {
          track.albumId = null;
        }
      });
      db.favorites.albums = db.favorites.albums.filter((album) => album !== id);

      return;
    } else throw new HttpException('Bad request', 404);
  }
}
