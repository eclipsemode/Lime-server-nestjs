import IProfile from './profile.type';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export default interface IUser {
  id: string;
  role: UserRole;
  tel: string;
  isActivated: boolean;
  bonus?: any[];
  token?: any;
  order?: any[];
  confirmation?: any;
  profile?: IProfile;
  createdAt: Date;
  updatedAt: Date;
}
