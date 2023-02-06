import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { ArtistsModule } from 'src/modules/artists/artists.module';
import { AlbumsModule } from 'src/modules/albums/albums.module';
import { TracksModule } from 'src/modules/tracks/tracks.module';

@Module({
  imports: [ArtistsModule, AlbumsModule, TracksModule],
  controllers: [FavoritesController],
  providers: [FavoritesService]
})
export class FavoritesModule {}
