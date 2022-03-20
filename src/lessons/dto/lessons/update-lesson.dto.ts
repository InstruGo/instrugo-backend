import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsIn,
  IsOptional,
  IsPositive,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { EducationLevel } from '../../entities/lesson.level.enum';
import { MeetingType } from '../../entities/lesson.meeting-type.enum';
import { CreateLessonTimeFrameDto } from '../lesson-time-frames/create-lesson-time-frame.dto';

export class UpdateLessonDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  subfield?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsIn(Object.values(EducationLevel))
  level?: EducationLevel;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  grade?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsIn(Object.values(MeetingType))
  type?: MeetingType;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  location?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsPositive()
  budget?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  subjectId?: number;

  @IsOptional()
  @IsNotEmpty()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateLessonTimeFrameDto)
  lessonTimeFrames?: CreateLessonTimeFrameDto[];
}
