import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { DbService } from '../db/db.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, DbService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('Should find and return user by id', async () => {
      const result = {
        id: 'bf60ab0f-23ac-4da6-a269-e61e63b72117',
        role: 'USER',
        tel: '79180000000',
        isActivated: false,
        createdAt: '2024-02-02T23:02:49.076Z',
        updatedAt: '2024-02-02T23:02:49.076Z',
        bonus: [],
        order: [],
        profile: null,
      };
      // @ts-ignore
      jest.spyOn(service, 'findOne').mockResolvedValue(result);
    });
  });
});
