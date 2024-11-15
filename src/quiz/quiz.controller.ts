import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common'
import { QuizService } from './quiz.service'
import { CreateQuizDto } from './dto/create-quiz.dto'
import { SubmitAnswerDto } from './dto/submit-answer.dto'

@Controller('quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService) { }

    @Post()
    create(@Body() createQuizDto: CreateQuizDto) {
        return this.quizService.createQuiz(createQuizDto)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.quizService.getQuiz(+id)
    }

    @Post(':quizId/question/:questionId/answer')
    async submitAnswer(
        @Param('quizId', ParseIntPipe) quizId: number,
        @Param('questionId', ParseIntPipe) questionId: number,
        @Body() submitAnswerDto: SubmitAnswerDto,
    ) {
        const result = await this.quizService.submitAnswer(quizId, questionId, submitAnswerDto);
        return result;
    }
}
