import {
	IsNotEmpty,
	IsString,
    IsInt,
	IsIn,
	IsOptional,
    IsDecimal,
} from 'class-validator';

import { EducationLevel } from '../entities/lesson.level.enum';
import { MeetingType } from '../entities/lesson.meeting_type.enum';

export class FilterLessonDto {

    @IsOptional()
	@IsNotEmpty()
	@IsIn(Object.values(EducationLevel))
	level?: EducationLevel;

    @IsOptional()
    @IsNotEmpty()
	@IsInt() 
    grade?: number;

    @IsOptional()
    @IsNotEmpty()
	@IsIn(Object.values(MeetingType))
	type?: MeetingType;

    @IsOptional()
    @IsNotEmpty()
	@IsDecimal() 
    minPrice?: number;

	@IsOptional()
    @IsNotEmpty()
	@IsDecimal() 
    maxPrice?: number;

    @IsOptional()
    @IsNotEmpty()
	@IsInt() 
	subjectId?: number;
}

