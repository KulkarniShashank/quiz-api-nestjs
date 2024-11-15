import { Test, TestingModule } from '@nestjs/testing';
import { ResultService } from './result.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ResultService', () => {
  let service: ResultService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResultService, PrismaService],
    }).compile();

    service = module.get<ResultService>(ResultService);
  });

  it('should calculate correct score and summary', async () => {
    const result = await service.getResult(1, 123);
    expect(result.score).toBe(4); // Expect score to be 4
    expect(result.summary.length).toBe(5); // Expect 5 questions in total
  });
});
