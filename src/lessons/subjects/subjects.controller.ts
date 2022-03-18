import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { SubjectsService } from './subjects.service';
import { Subject } from '../entities/subject.entity';
import { CreateSubjectDto } from '../dto/subjects/create-subject.dto';
import { FilterSubjectDto } from '../dto/subjects/filter-subject.dto';
import { UpdateSubjectDto } from '../dto/subjects/update-subject.dto';

@ApiTags('subjects')
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  @ApiResponse({ status: 200, type: Subject })
  getSubjects(@Body() filterSubjectDto: FilterSubjectDto): Promise<Subject[]> {
    return this.subjectsService.getSubjects(filterSubjectDto);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Subject })
  getSubject(@Param('id', ParseIntPipe) id: number): Promise<Subject> {
    return this.subjectsService.getSubject(id);
  }

  @Post()
  @ApiResponse({ status: 201, type: Subject })
  createSubject(@Body() createSubjectDto: CreateSubjectDto): Promise<Subject> {
    return this.subjectsService.createSubject(createSubjectDto);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, type: Subject })
  updateSubject(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLessonDto: UpdateSubjectDto
  ): Promise<Subject> {
    return this.subjectsService.updateSubject(id, updateLessonDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  deleteSubject(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.subjectsService.deleteSubject(id);
  }
}
