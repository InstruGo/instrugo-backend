import { IsNotEmpty, IsInt, IsPositive } from 'class-validator';

export class RateLessonDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  studentRating: number;
}
