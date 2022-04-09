import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsPositive } from 'class-validator';

export class CreateRatingDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @ApiProperty()
  lessonId: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @ApiProperty()
  studentId: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @ApiProperty()
  tutorId: number;
}
