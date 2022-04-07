import {
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CreateTimeFrameDto } from '../../time-frames/dto/create-lesson-time-frame.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class UpdateTutorResponseDto {
  @IsOptional()
  @IsNotEmpty()
  @IsPositive()
  @ApiPropertyOptional()
  price?: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateTimeFrameDto)
  @ApiPropertyOptional({ type: CreateTimeFrameDto, isArray: true })
  tutorTimeFrames?: CreateTimeFrameDto[];
}
