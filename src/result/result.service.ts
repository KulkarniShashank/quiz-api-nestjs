import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ResultService {
  constructor(private prisma: PrismaService) {}

  // Calculate the result for a specific quiz and user
  async getResult(quizId: number, userId: number) {
    // Fetch all answers by the user for the given quiz
    const answers = await this.prisma.answer.findMany({
      where: {
        question: {
          quiz_id: quizId, // Only answers for the specific quiz
        },
      },
      include: {
        question: true, // Include question details for reference
      },
    });

    if (answers.length === 0) {
      throw new NotFoundException('No answers found for this quiz and user');
    }

    // Calculate the score (count correct answers)
    const correctAnswers = answers.filter(answer => answer.is_correct).length;
    const totalQuestions = answers.length;
    const score = correctAnswers;

    // Construct the result summary
    const resultSummary = answers.map(answer => ({
      question: answer.question.text,
      selected_option: answer.selected_option,
      is_correct: answer.is_correct,
      correct_option: answer.question.correct_option,
    }));

    return {
      quizId,
      userId,
      totalQuestions,
      score,
      summary: resultSummary,
    };
  }
}
