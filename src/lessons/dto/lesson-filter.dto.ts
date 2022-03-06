import { IsNotEmpty, IsInt, IsIn, IsOptional } from 'class-validator';

import { EducationLevel } from '../entities/lesson.level.enum';
import { MeetingType } from '../entities/lesson.meeting_type.enum';
import { LessonStatus } from '../entities/lesson.status.enum';
import { IsPositive } from 'class-validator';

export class FilterLessonDto {
  @IsOptional()
  @IsNotEmpty()
  @IsIn(Object.values(EducationLevel))
  level?: EducationLevel;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  grade?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsIn(Object.values(MeetingType))
  type?: MeetingType;

  @IsOptional()
  @IsNotEmpty()
  @IsPositive()
  minPrice?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsPositive()
  maxPrice?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsIn(Object.values(LessonStatus))
  status?: LessonStatus;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  subjectId?: number;
}
