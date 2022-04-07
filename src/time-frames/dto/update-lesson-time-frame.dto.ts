import { IsISO8601, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTimeFrameDto {
  @IsOptional()
  @IsNotEmpty()
  @IsISO8601()
  startTime?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsISO8601()
  endTime?: string;
}
