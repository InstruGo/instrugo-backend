import { IsNotEmpty, IsString } from 'class-validator';

export class LeaveFeedbackDto {
  @IsNotEmpty()
  @IsString()
  tutorFeedback: string;
}
