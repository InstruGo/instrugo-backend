import {
  IsPositive,
  IsNotEmpty,
  IsInt,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CreateTimeFrameDto } from '../../time-frames/dto/create-lesson-time-frame.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTutorResponseDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @ApiProperty()
  lessonId: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @ApiProperty()
  tutorId: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateTimeFrameDto)
  @ApiProperty({ type: CreateTimeFrameDto, isArray: true })
  tutorTimeFrames: CreateTimeFrameDto[];
}
