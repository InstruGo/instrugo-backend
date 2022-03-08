import { IsNotEmpty, IsInt, IsPositive } from 'class-validator';

export class CreateRatingDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  rating: number;

  @IsNotEmpty()
  @IsInt()
  studentId: number;

  @IsNotEmpty()
  @IsInt()
  tutorId: number;
}
