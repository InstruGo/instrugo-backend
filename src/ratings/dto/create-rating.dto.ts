import { IsNotEmpty, IsInt, IsPositive } from 'class-validator';

export class CreateRatingDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  lessonId: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  studentId: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  tutorId: number;
}
