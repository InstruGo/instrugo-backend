import { IsNotEmpty, IsISO8601 } from 'class-validator';

export class CreateTutorResponseTimeFrameDto {
  @IsNotEmpty()
  @IsISO8601()
  startTime: string;

  @IsNotEmpty()
  @IsISO8601()
  endTime: string;
}
