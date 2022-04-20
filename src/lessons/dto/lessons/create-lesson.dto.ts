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
import { CreateTimeFrameDto } from '../../../time-frames/dto/create-lesson-time-frame.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLessonDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  subfield: string;

  @IsNotEmpty()
  @IsIn(Object.values(EducationLevel))
  @ApiProperty({ enum: EducationLevel, enumName: 'EducationLevel' })
  level: EducationLevel;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @ApiProperty()
  grade: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsIn(Object.values(MeetingType))
  @ApiProperty({ enum: MeetingType, enumName: 'MeetingType' })
  type: MeetingType;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  location: string;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  duration: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  budget: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @ApiProperty()
  subjectId: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateTimeFrameDto)
  @ApiProperty({ type: CreateTimeFrameDto, isArray: true })
  lessonTimeFrames: CreateTimeFrameDto[];
}
