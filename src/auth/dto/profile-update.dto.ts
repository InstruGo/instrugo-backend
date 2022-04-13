import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsPhoneNumber, IsOptional, IsArray } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  firstName?: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  lastName?: string;

  @IsOptional()
  @IsPhoneNumber()
  @ApiPropertyOptional()
  phone?: string;

  @IsOptional()
  @IsArray()
  @ApiPropertyOptional({ isArray: true })
  subjectIds?: number[];
}
