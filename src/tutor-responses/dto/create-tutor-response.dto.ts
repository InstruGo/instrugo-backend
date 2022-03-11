import { IsDecimal, IsPositive, IsNotEmpty, IsInt } from 'class-validator';

export class CreateTutorResponseDto {
  @IsNotEmpty()
  @IsDecimal()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  lessonId: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  tutorId: number;
}
