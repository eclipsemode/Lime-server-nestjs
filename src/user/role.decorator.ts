import { Reflector } from '@nestjs/core';
import { UserRole } from './interfaces/user.interface';

export const Role = Reflector.createDecorator<UserRole>();
