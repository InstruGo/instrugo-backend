import {
  IsOptional,
  IsPositive,
  IsDecimal,
  IsNotEmpty,
  IsInt,
} from 'class-validator';

export class FilterTutorResponseDto {
  @IsNotEmpty()
  @IsDecimal()
  @IsPositive()
  @IsOptional()
  price: number;

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
