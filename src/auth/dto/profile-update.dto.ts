import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsPhoneNumber,
  IsOptional,
  IsArray,
  IsISO8601,
} from 'class-validator';

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
  @IsArray()
  @ApiPropertyOptional({ isArray: true })
  subjectIds?: number[];
}
