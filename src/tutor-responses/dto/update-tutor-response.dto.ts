import {
  IsOptional,
  IsPositive,
  IsDecimal,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTutorResponseTimeFrameDto } from './create-tutor-response-time-frame.dto';

export class UpdateTutorResponseDto {
  @IsNotEmpty()
  @IsDecimal()
  @IsPositive()
  @IsOptional()
  price: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateTutorResponseTimeFrameDto)
  tutorTimeFrames?: CreateTutorResponseTimeFrameDto[];
}
