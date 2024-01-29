import ProfileInterface from './profile.interface';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export default interface UserInterface {
  id: string;
  role: UserRole;
  tel: string;
  isActivated: boolean;
  bonus?: any[];
  token?: any;
  order?: any[];
  confirmation?: any;
  profile?: ProfileInterface;
  createdAt: Date;
  updatedAt: Date;
}
