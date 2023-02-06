import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { db } from '../../database/db';
import { AlbumsService } from '../../modules/albums/albums.service';
import { ArtistsService } from '../../modules/artists/artists.service';
import { TracksService } from '../../modules/tracks/tracks.service';
import { deleteByValidId, typeByValidId } from './helpers';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => ArtistsService))
    private artistsService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
  ) {}

  getAllFavs() {
    const artists = db.favorites.artists.map((artistId) =>
      this.artistsService.getArtistById(artistId),
    );
    const albums = db.favorites.albums.map((albumId) =>
      this.albumsService.getAlbumById(albumId),
    );
    const tracks = db.favorites.tracks.map((trackId) =>
      this.tracksService.getTrackById(trackId),
    );
    const favs = {
      artists,
      albums,
      tracks,
    };
    return favs;
  }

  addFavorite(id: string, type: string) {
    const elById = typeByValidId(id, type);
    if (!db.favorites[`${type}s`].includes(id)) {
      db.favorites[`${type}s`].push(id);
      return elById;
    }
  }

  deleteFavorite(id: string, type: string) {
    const elById = deleteByValidId(id, type);
    if (elById) {
      db.favorites[`${type}s`] = db.favorites[`${type}s`].filter(
        (elId: string) => elId !== id,
      );
      return;
    }
  }
}
