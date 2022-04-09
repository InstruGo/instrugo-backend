import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTimeFrameDto {
  @IsOptional()
  @IsNotEmpty()
  @IsISO8601()
  @ApiPropertyOptional()
  startTime?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsISO8601()
  @ApiPropertyOptional()
  endTime?: string;
}
