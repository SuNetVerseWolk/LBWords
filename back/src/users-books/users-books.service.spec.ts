import { Test, TestingModule } from '@nestjs/testing';
import { UsersBooksService } from './users-books.service';

describe('UsersBooksService', () => {
  let service: UsersBooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersBooksService],
    }).compile();

    service = module.get<UsersBooksService>(UsersBooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
