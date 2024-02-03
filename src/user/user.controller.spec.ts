import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DbService } from '../db/db.service';
import { TokenService } from '../token/token.service';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from './types/user.type';
import { UserEntity } from './entities/user.entity';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, DbService, TokenService, JwtService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('Should return an array of cats', async () => {
      const result: UserEntity[] = [
        {
          id: 'test',
          role: UserRole.USER,
          tel: '79180000000',
          isActivated: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      // @ts-ignore
      jest.spyOn(service, 'findAll').mockImplementation(() => result);
      expect(await controller.findAll()).toBe(result);
    });
  });
});
