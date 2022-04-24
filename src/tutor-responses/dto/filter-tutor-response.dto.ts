import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive, IsNotEmpty, IsInt } from 'class-validator';

export class FilterTutorResponseDto {
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @ApiProperty()
  lessonId: number;
}
