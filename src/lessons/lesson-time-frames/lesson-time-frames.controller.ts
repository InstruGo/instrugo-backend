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
import { CreateLessonTimeFrameDto } from '../dto/lesson-time-frames/create-lesson-time-frame.dto';
import { UpdateLessonTimeFrameDto } from '../dto/lesson-time-frames/update-lesson-time-frame.dto';
import { LessonTimeFrame } from '../entities/lesson-time-frame.entity';
import { LessonTimeFramesService } from './lesson-time-frames.service';

@ApiTags('lesson time frames')
@Controller('lesson-time-frames')
export class LessonTimeFramesController {
  constructor(
    private readonly lessonTimeFramesService: LessonTimeFramesService
  ) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, type: LessonTimeFrame })
  getLessonTimeFrames(): Promise<LessonTimeFrame[]> {
    return this.lessonTimeFramesService.getLessonTimeFrames();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, type: LessonTimeFrame })
  getLessonTimeFrame(
    @Param('id', ParseIntPipe) id: number
  ): Promise<LessonTimeFrame> {
    return this.lessonTimeFramesService.getLessonTimeFrame(id);
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 201, type: LessonTimeFrame })
  createLessonTimeFrame(
    @Body() createLessonTimeFrameDto: CreateLessonTimeFrameDto
  ): Promise<LessonTimeFrame> {
    return this.lessonTimeFramesService.createLessonTimeFrame(
      createLessonTimeFrameDto
    );
  }

  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, type: LessonTimeFrame })
  updateLessonTimeFrame(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLessonTimeFrameDto: UpdateLessonTimeFrameDto
  ): Promise<LessonTimeFrame> {
    return this.lessonTimeFramesService.updateLessonTimeFrame(
      id,
      updateLessonTimeFrameDto
    );
  }

  @Delete(':id')
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  deleteLessonTimeFrame(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.lessonTimeFramesService.deleteLessonTimeFrame(id);
  }
}
