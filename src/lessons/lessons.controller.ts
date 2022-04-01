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
  HttpCode,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { LessonsService } from './lessons.service';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonDto } from './dto/lessons/create-lesson.dto';
import { FilterLessonDto } from './dto/lessons/filter-lesson.dto';
import { UpdateLessonDto } from './dto/lessons/update-lesson.dto';

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
  @HttpCode(204)
  deleteLesson(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.lessonsService.deleteLesson(id);
  }

  @Post('resolve/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, type: Lesson })
  resolveLessonRequest(
    @Param('id', ParseIntPipe) id: number,
    @Body() chosenTutorResponseTimeFrameId: number
  ): Promise<Lesson> {
    return this.lessonsService.resolveLessonRequest(
      id,
      chosenTutorResponseTimeFrameId
    );
  }
}
