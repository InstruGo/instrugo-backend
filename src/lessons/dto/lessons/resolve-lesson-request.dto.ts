import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class ResolveLessonRequestDto {
  @IsInt()
  @IsPositive()
  @ApiProperty()
  tutorResponseId: number;

  @IsInt()
  @IsPositive()
  @ApiProperty()
  timeFrameId: number;
}
