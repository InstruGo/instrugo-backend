import {
  IsNotEmpty,
  IsInt,
  IsIn,
  IsOptional,
  IsPositive,
  IsArray,
} from 'class-validator';

import { EducationLevel } from '../../entities/lesson.level.enum';
import { MeetingType } from '../../entities/lesson.meeting-type.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsISO8601 } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterPoolDto {
  @IsOptional()
  @IsNotEmpty()
  @IsIn(Object.values(EducationLevel))
  @ApiPropertyOptional({ enum: EducationLevel, enumName: 'EducationLevel' })
  level?: EducationLevel;

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
  minBudget?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsPositive()
  @Type(() => Number)
  @ApiPropertyOptional()
  maxBudget?: number;

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
}