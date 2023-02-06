import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TracksModule } from './modules/tracks/tracks.module';
import { ArtistsModule } from './modules/artists/artists.module';
import { AlbumsModule } from './modules/albums/albums.module';
import { FavoritesController } from './modules/favorites/favorites.controller';
import { FavoritesService } from './modules/favorites/favorites.service';
import { FavoritesModule } from './modules/favorites/favorites.module';

@Module({
  imports: [
    UsersModule,
    TracksModule,
    ArtistsModule,
    AlbumsModule,
    FavoritesModule,
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class AppModule {}
