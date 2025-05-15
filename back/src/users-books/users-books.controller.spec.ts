import { Test, TestingModule } from '@nestjs/testing';
import { UsersBooksController } from './users-books.controller';

describe('UsersBooksController', () => {
  let controller: UsersBooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersBooksController],
    }).compile();

    controller = module.get<UsersBooksController>(UsersBooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
