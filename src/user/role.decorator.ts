import { Reflector } from '@nestjs/core';
import { UserRole } from './types/user.type';

export const Role = Reflector.createDecorator<UserRole>();
