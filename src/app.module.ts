import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResultModule } from './result/result.module';
import { PrismaModule } from './prisma/prisma.module';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [ResultModule, QuizModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
