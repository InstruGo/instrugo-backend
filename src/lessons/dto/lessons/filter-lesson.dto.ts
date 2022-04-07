import {
  IsNotEmpty,
  IsInt,
  IsIn,
  IsOptional,
  IsPositive,
} from 'class-validator';

import { EducationLevel } from '../../entities/lesson.level.enum';
import { LessonStatus } from '../../entities/lesson.status.enum';
import { MeetingType } from '../../entities/lesson.meeting-type.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterLessonDto {
  @IsOptional()
  @IsNotEmpty()
  @IsIn(Object.values(EducationLevel))
  @ApiPropertyOptional({ enum: EducationLevel, enumName: 'EducationLevel' })
  level?: EducationLevel;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @ApiPropertyOptional()
  grade?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsIn(Object.values(MeetingType))
  @ApiPropertyOptional({ enum: MeetingType, enumName: 'MeetingType' })
  type?: MeetingType;

  @IsOptional()
  @IsNotEmpty()
  @IsPositive()
  @ApiPropertyOptional()
  minPrice?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsPositive()
  @ApiPropertyOptional()
  maxPrice?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsIn(Object.values(LessonStatus))
  @ApiPropertyOptional({ enum: LessonStatus, enumName: 'LessonStatus' })
  status?: LessonStatus;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @ApiPropertyOptional()
  subjectId?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @ApiPropertyOptional()
  studentId?: number;
}
