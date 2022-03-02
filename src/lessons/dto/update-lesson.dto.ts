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

export class UpdateLessonDto {
    @IsOptional()
    @IsNotEmpty()
	@IsString()
	subfield?: string;

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
	@IsString()
	description?: string;

    @IsOptional()
    @IsNotEmpty()
	@IsIn(Object.values(MeetingType))
	type?: MeetingType;

    @IsOptional()
    @IsNotEmpty()
	@IsString()
	location?: string;

    @IsOptional()
    @IsNotEmpty()
	@IsDecimal() 
    budget?: number;

    @IsOptional()
    @IsNotEmpty()
	@IsInt() 
	subjectId?: number;
}

