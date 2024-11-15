import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateQuizDto } from './dto/create-quiz.dto'
import { SubmitAnswerDto } from './dto/submit-answer.dto'

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async createQuiz(data: CreateQuizDto) {
    return this.prisma.quiz.create({
      data: {
        title: data.title,
        questions: {
          create: data.questions.map(q => ({
            text: q.text,
            options: q.options,
            correct_option: q.correct_option,
          })),
        },
      },
      include: { questions: true },
    })
  }

  async getQuiz(id: number) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: { questions: true },
    })
    if (!quiz) throw new NotFoundException('Quiz not found')
  
    // Remove correct_option from the response
    const sanitizedQuestions = quiz.questions.map(q => ({
      id: q.id,
      text: q.text,
      options: q.options,
    }))
    
    return { ...quiz, questions: sanitizedQuestions }
  }

  async submitAnswer(quizId: number, questionId: number, submitAnswerDto: SubmitAnswerDto) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${quizId} not found.`);
    }

    const question = quiz.questions.find((q) => q.id === questionId);

    if (!question) {
      throw new NotFoundException(`Question with ID ${questionId} not found in this quiz.`);
    }

    const isCorrect = question.correct_option === submitAnswerDto.selected_option;

    // Store the answer (optional: if you're saving it)
    await this.prisma.answer.create({
      data: {
        question_id: questionId,
        selected_option: submitAnswerDto.selected_option,
        is_correct: isCorrect,
      },
    });

    if (isCorrect) {
      return {
        is_correct: true,
        message: 'Correct! Well done!',
      };
    } else {
      return {
        is_correct: false,
        correct_option: question.correct_option,
        message: `Incorrect! The correct answer is option ${question.correct_option}.`,
      };
    }
  }
  
}
