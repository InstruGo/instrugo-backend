import { IsNotEmpty, IsInt, IsPositive, IsOptional } from 'class-validator';

export class FilterRatingDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @IsOptional()
  studentRating?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  lessonId?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  studentId?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  tutorId?: number;
}
