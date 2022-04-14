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

export class FilterPoolDto {
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
  minBudget?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsPositive()
  @ApiPropertyOptional()
  maxBudget?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @ApiPropertyOptional({ isArray: true })
  subjectIds?: number[];
}
