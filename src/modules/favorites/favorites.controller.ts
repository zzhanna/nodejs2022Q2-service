import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { IFavoritesResponce } from 'src/interface/interface';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAllFavorites(): IFavoritesResponce {
    return this.favoritesService.getAllFavs();
  }

  @Post(':type/:id')
  addFavorite(@Param('type') type: string, @Param('id') id: string) {
    return this.favoritesService.addFavorite(id, type);
  }

  @Delete(':type/:id')
  @HttpCode(204)
  deleteFavorite(@Param('type') type: string, @Param('id') id: string) {
    return this.favoritesService.deleteFavorite(id, type);
  }
}
