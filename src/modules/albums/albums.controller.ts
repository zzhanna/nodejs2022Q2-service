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
import { IAlbum } from '../../interface/interface';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/albums-dto';

@Controller('album')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  async getAllAlbums(): Promise<IAlbum[]> {
    return await this.albumsService.getAll();
  }
  @Get(':id')
  async getdataAlbumById(@Param('id') id: string): Promise<IAlbum> {
    return await this.albumsService.getAlbumById(id);
  }

  @Post()
  async createNewAlbum(@Body() dataAlbum: CreateAlbumDto): Promise<IAlbum> {
    return await this.albumsService.createAlbum(dataAlbum);
  }

  @Put(':id')
  async updateAlbum(
    @Param('id') id: string,
    @Body() dataAlbum: UpdateAlbumDto,
  ) {
    return await this.albumsService.updateAlbum(id, dataAlbum);
  }
  @Delete(':id')
  @HttpCode(204)
  async deleteAlbumById(@Param('id') id: string) {
    return await this.albumsService.deleteAlbum(id);
  }
}
