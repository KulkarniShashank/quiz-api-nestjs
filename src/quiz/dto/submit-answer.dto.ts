import { IsInt, IsNotEmpty } from 'class-validator';

export class SubmitAnswerDto {
  @IsInt()
  @IsNotEmpty()
  selected_option: number;
}
