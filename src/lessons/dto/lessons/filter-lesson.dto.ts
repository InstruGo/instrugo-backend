import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsInt,
  IsIn,
  IsOptional,
  IsPositive,
  IsBoolean,
  IsArray,
  IsISO8601,
} from 'class-validator';

import { EducationLevel } from '../../entities/lesson.education-level.enum';
import { LessonStatus } from '../../entities/lesson.status.enum';
import { MeetingType } from '../../entities/lesson.meeting-type.enum';
import { Type } from 'class-transformer';

export class FilterLessonDto {
  @IsOptional()
  @IsNotEmpty()
  @IsIn(Object.values(EducationLevel))
  @ApiPropertyOptional({ enum: EducationLevel, enumName: 'EducationLevel' })
  educationLevel?: EducationLevel;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
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
  @Type(() => Number)
  @ApiPropertyOptional()
  minDuration?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsPositive()
  @Type(() => Number)
  @ApiPropertyOptional()
  maxDuration?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsPositive()
  @Type(() => Number)
  @ApiPropertyOptional()
  minBudget?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsPositive()
  @Type(() => Number)
  @ApiPropertyOptional()
  maxBudget?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsIn(Object.values(LessonStatus))
  @ApiPropertyOptional({ enum: LessonStatus, enumName: 'LessonStatus' })
  status?: LessonStatus;

  @IsOptional()
  @IsNotEmpty()
  @IsISO8601()
  @ApiPropertyOptional()
  after?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsISO8601()
  @ApiPropertyOptional()
  before?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @ApiPropertyOptional({ isArray: true })
  subjectIds?: number[];

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  @ApiPropertyOptional()
  isLessonTutor?: boolean;
}
