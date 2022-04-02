import { IsOptional, IsPositive, IsNotEmpty, IsInt } from 'class-validator';

export class FilterTutorResponseDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @IsOptional()
  lessonId: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @IsOptional()
  tutorId: number;
}
