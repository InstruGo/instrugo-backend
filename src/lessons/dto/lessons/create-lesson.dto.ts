import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsIn,
  IsPositive,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';

import { EducationLevel } from '../../entities/lesson.level.enum';
import { MeetingType } from '../../entities/lesson.meeting-type.enum';
import { CreateLessonTimeFrameDto } from '../lesson-time-frames/create-lesson-time-frame.dto';

export class CreateLessonDto {
  @IsNotEmpty()
  @IsString()
  subfield: string;

  @IsNotEmpty()
  @IsIn(Object.values(EducationLevel))
  level: EducationLevel;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  grade: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsIn(Object.values(MeetingType))
  type: MeetingType;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsPositive()
  budget: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  subjectId: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateLessonTimeFrameDto)
  lessonTimeFrames: CreateLessonTimeFrameDto[];
}
