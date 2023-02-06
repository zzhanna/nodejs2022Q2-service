import { Controller, Get } from '@nestjs/common';
import { IFavoritesResponce } from 'src/interface/interface';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAllFavorites(): IFavoritesResponce {
    return this.favoritesService.getAll();
  }
}
