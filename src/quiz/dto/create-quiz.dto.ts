export class CreateQuizDto {
    title: string
    questions: CreateQuestionDto[]
  }
  
  export class CreateQuestionDto {
    text: string
    options: string[]
    correct_option: number
  }
  