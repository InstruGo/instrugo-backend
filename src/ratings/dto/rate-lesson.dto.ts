import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsPositive } from 'class-validator';

export class RateLessonDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @ApiProperty()
  studentRating: number;
}
