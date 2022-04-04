import {
  IsPositive,
  IsNotEmpty,
  IsInt,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CreateLessonTimeFrameDto } from '../../lessons/dto/lesson-time-frames/create-lesson-time-frame.dto';

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
  @Type(() => CreateLessonTimeFrameDto)
  tutorTimeFrames: CreateLessonTimeFrameDto[];
}
