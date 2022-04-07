import { IsNotEmpty, IsISO8601 } from 'class-validator';

export class CreateTimeFrameDto {
  @IsNotEmpty()
  @IsISO8601()
  startTime: string;

  @IsNotEmpty()
  @IsISO8601()
  endTime: string;
}
