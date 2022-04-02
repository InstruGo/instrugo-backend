import {
  IsPositive,
  IsNotEmpty,
  IsInt,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CreateTutorResponseTimeFrameDto } from './create-tutor-response-time-frame.dto';
export class CreateTutorResponseDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  lessonId: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  tutorId: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateTutorResponseTimeFrameDto)
  tutorTimeFrames: CreateTutorResponseTimeFrameDto[];
}
