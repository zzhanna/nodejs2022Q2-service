import {
  IArtist,
  IUser,
  ITrack,
  IAlbum,
  IFavorites,
} from './../interface/interface';

export type DB = {
  users: IUser[];
  artists: IArtist[];
  tracks: ITrack[];
  albums: IAlbum[];
  favorites: IFavorites;
};

export const db: DB = {
  users: [],
  artists: [],
  tracks: [],
  albums: [],
  favorites: {
    artists: [],
    tracks: [],
    albums: [],
  },
};
