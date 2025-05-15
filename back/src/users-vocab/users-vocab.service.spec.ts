import { Test, TestingModule } from '@nestjs/testing';
import { UsersVocabService } from './users-vocab.service';

describe('UsersVocabService', () => {
  let service: UsersVocabService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersVocabService],
    }).compile();

    service = module.get<UsersVocabService>(UsersVocabService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
