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
import { CreateTimeFrameDto } from '../../../time-frames/dto/create-lesson-time-frame.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateLessonDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional()
  subfield?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsIn(Object.values(EducationLevel))
  @ApiPropertyOptional({ enum: EducationLevel, enumName: 'EducationLevel' })
  educationLevel?: EducationLevel;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @ApiPropertyOptional()
  grade?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional()
  description?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsIn(Object.values(MeetingType))
  @ApiPropertyOptional({ enum: MeetingType, enumName: 'MeetingType' })
  type?: MeetingType;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional()
  location?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsPositive()
  @ApiPropertyOptional()
  duration?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsPositive()
  @ApiPropertyOptional()
  budget?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @ApiPropertyOptional()
  subjectId?: number;

  @IsOptional()
  @IsNotEmpty()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateTimeFrameDto)
  @ApiPropertyOptional({ type: CreateTimeFrameDto, isArray: true })
  lessonTimeFrames?: CreateTimeFrameDto[];
}
