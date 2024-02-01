import UserInterface, { UserRole } from '../../user/interfaces/user.interface';

export class TokenDto {
  id: string;
  role: UserRole;
  tel: string;

  constructor(userData: UserInterface) {
    this.id = userData.id;
    this.role = userData.role;
    this.tel = userData.tel;
  }
}
