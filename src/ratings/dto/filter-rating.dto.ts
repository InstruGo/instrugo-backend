import { IsNotEmpty, IsInt, IsPositive, IsOptional } from 'class-validator';

export class FilterRatingDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @IsOptional()
  rating?: number;

  @IsNotEmpty()
  @IsInt()
  @IsOptional()
  studentId?: number;

  @IsNotEmpty()
  @IsInt()
  @IsOptional()
  tutorId?: number;
}
