import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ClassSerializerInterceptor,
  UseInterceptors,
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
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, type: Lesson })
  getLessons(@Body() filterLessonDto: FilterLessonDto): Promise<Lesson[]> {
    return this.lessonsService.getLessons(filterLessonDto);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, type: Lesson })
  getLesson(@Param('id', ParseIntPipe) id: number): Promise<Lesson> {
    return this.lessonsService.getLesson(id);
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 201, type: Lesson })
  createLesson(@Body() createLessonDto: CreateLessonDto): Promise<Lesson> {
    return this.lessonsService.createLesson(createLessonDto);
  }

  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, type: Lesson })
  updateLesson(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLessonDto: UpdateLessonDto
  ): Promise<Lesson> {
    return this.lessonsService.updateLesson(id, updateLessonDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204 })
  deleteLesson(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.lessonsService.deleteLesson(id);
  }
}
