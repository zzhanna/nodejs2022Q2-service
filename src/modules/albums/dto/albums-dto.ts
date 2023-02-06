import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  artistId: string | null;
}

export class UpdateAlbumDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsOptional()
  artistId: string | null;
}
