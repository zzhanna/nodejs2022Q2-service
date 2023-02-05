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
import { CreateTrackDto, UpdateTrackDto } from 'src/tracks/dto/tracks-dto';
import { TracksService } from './tracks.service';
import { ITrack } from './../interface/interface';

@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}
  @Get()
  async getAllUsers(): Promise<ITrack[]> {
    return await this.tracksService.getAll();
  }
  @Get(':id')
  async getTrackById(@Param('id') id: string): Promise<ITrack> {
    return await this.tracksService.getById(id);
  }

  @Post()
  async createNewTrack(
    @Body() dataUser: CreateTrackDto,
  ): Promise<CreateTrackDto> {
    return await this.tracksService.createUser(dataUser);
  }

  @Put(':id')
  async updateTrackbyId(
    @Param('id') id: string,
    @Body() dataTrack: UpdateTrackDto,
  ): Promise<UpdateTrackDto> {
    return await this.tracksService.updatePassword(id, dataTrack);
  }
  @Delete(':id')
  @HttpCode(204)
  async deleteUserById(@Param('id') id: string) {
    return await this.tracksService.deleteUser(id);
  }
}
