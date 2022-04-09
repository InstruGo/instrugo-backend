import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsPositive, IsOptional } from 'class-validator';

export class FilterRatingDto {
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @ApiPropertyOptional()
  studentRating?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @ApiPropertyOptional()
  lessonId?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @ApiPropertyOptional()
  studentId?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @ApiPropertyOptional()
  tutorId?: number;
}
