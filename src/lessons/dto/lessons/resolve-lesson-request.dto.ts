import { IsInt, IsPositive } from 'class-validator';

export class ResolveLessonRequestDto {
  @IsInt()
  @IsPositive()
  tutorResponseId: number;

  @IsInt()
  @IsPositive()
  chosenTimeFrameId: number;
}
