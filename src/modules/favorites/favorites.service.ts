import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { db } from 'src/database/db';
import { AlbumsService } from 'src/modules/albums/albums.service';
import { ArtistsService } from 'src/modules/artists/artists.service';
import { TracksService } from 'src/modules/tracks/tracks.service';

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

  getAll() {
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
}
