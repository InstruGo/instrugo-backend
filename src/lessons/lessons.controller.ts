import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { FilterLessonDto } from './dto/lesson-filter.dto';
import { Lesson } from './entities/lesson.entity';

@ApiTags('lessons')
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get()
  @ApiResponse({ status: 200, type: Lesson })
  findAll(@Body() filterLessonDto: FilterLessonDto): Promise<Lesson[]> {
    return this.lessonsService.findAll(filterLessonDto);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Lesson })
  findOne(@Param('id') id: string): Promise<Lesson> {
    return this.lessonsService.findOne(+id);
  }

  @Post()
  @ApiResponse({ status: 201, type: Lesson })
  create(@Body() createLessonDto: CreateLessonDto): Promise<Lesson> {
    return this.lessonsService.create(createLessonDto);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, type: Lesson })
  update(
    @Param('id') id: string,
    @Body() updateLessonDto: UpdateLessonDto
  ): Promise<Lesson> {
    return this.lessonsService.update(+id, updateLessonDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204 })
  delete(@Param('id') id: string): Promise<void> {
    return this.lessonsService.delete(+id);
  }
}
