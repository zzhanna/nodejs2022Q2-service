import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto, UpdateArtistDto } from './dto/artists-dto';
import { IArtist } from '../../interface/interface';

@Controller('artist')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}
  @Get()
  async getAllAtrists(): Promise<IArtist[]> {
    return await this.artistsService.getAll();
  }
  @Get(':id')
  async getArtistById(@Param('id') id: string): Promise<IArtist> {
    return await this.artistsService.getArtistById(id);
  }

  @Post()
  async createNewArtist(@Body() dataArtist: CreateArtistDto): Promise<IArtist> {
    return await this.artistsService.createArtist(dataArtist);
  }

  @Put(':id')
  async updateArtist(
    @Param('id') id: string,
    @Body() dataArtist: UpdateArtistDto,
  ) {
    return await this.artistsService.updateArtist(id, dataArtist);
  }
  @Delete(':id')
  @HttpCode(204)
  async deleteArtistById(@Param('id') id: string) {
    return await this.artistsService.deleteArtist(id);
  }
}
