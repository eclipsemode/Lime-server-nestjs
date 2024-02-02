import UserType, { UserRole } from '../../user/types/user.type';

export class TokenDto {
  id: string;
  role: UserRole;
  tel: string;

  constructor(userData: UserType) {
    this.id = userData.id;
    this.role = userData.role;
    this.tel = userData.tel;
  }
}
