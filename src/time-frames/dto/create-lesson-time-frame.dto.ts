import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsISO8601 } from 'class-validator';

export class CreateTimeFrameDto {
  @IsNotEmpty()
  @IsISO8601()
  @ApiProperty()
  startTime: string;

  @IsNotEmpty()
  @IsISO8601()
  @ApiProperty()
  endTime: string;
}
