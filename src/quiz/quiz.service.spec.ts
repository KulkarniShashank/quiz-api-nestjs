import { Test, TestingModule } from '@nestjs/testing'
import { QuizService } from './quiz.service'
import { PrismaService } from '../prisma/prisma.service'

describe('QuizService', () => {
  let service: QuizService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizService, PrismaService],
    }).compile()

    service = module.get<QuizService>(QuizService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
