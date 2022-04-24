import { IsOptional, ValidateNested } from 'class-validator';
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
  @ValidateNested()
  @Type(() => CreateTimeFrameDto)
  @ApiPropertyOptional({ type: CreateTimeFrameDto })
  tutorTimeFrame?: CreateTimeFrameDto;
}
