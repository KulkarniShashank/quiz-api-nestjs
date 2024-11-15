import { Controller, Get, Param } from '@nestjs/common';
import { ResultService } from './result.service';

@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Get(':quizId/:userId')
  async getResult(
    @Param('quizId') quizId: string,
    @Param('userId') userId: string
  ) {
    return this.resultService.getResult(+quizId, +userId);
  }
}
