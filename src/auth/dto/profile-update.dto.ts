import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsInt } from 'class-validator';
import {
  IsString,
  IsPhoneNumber,
  IsOptional,
  IsArray,
  IsISO8601,
  IsIn,
} from 'class-validator';

import { EducationLevel } from '../../lessons/entities/lesson.education-level.enum';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  lastName?: string;

  @IsOptional()
  @IsPhoneNumber()
  @ApiPropertyOptional()
  phone?: string;

  @IsOptional()
  @IsISO8601()
  @ApiPropertyOptional()
  birthDate?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  description?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsIn(Object.values(EducationLevel))
  @ApiPropertyOptional({ enum: EducationLevel, enumName: 'EducationLevel' })
  educationLevel?: EducationLevel;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @ApiPropertyOptional()
  grade?: number;

  @IsOptional()
  @IsArray()
  @ApiPropertyOptional({ isArray: true })
  subjectIds?: number[];
}
