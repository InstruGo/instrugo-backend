import { ApiProperty } from '@nestjs/swagger';
import { IsPositive, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateTimeFrameDto } from '../../time-frames/dto/create-lesson-time-frame.dto';

export class CreateTutorResponseDto {
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  price: number;

  @ValidateNested()
  @Type(() => CreateTimeFrameDto)
  @ApiProperty({ type: CreateTimeFrameDto })
  tutorTimeFrame: CreateTimeFrameDto;
}
