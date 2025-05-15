import { Test, TestingModule } from '@nestjs/testing';
import { UsersVocabController } from './users-vocab.controller';

describe('UsersVocabController', () => {
  let controller: UsersVocabController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersVocabController],
    }).compile();

    controller = module.get<UsersVocabController>(UsersVocabController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
