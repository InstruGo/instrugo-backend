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

import { CreateTutorResponseTimeFrameDto } from '../dto/create-tutor-response-time-frame.dto';
import { UpdateTutorResponseTimeFrameDto } from '../dto/update-tutor-response-time-frame.dto';
import { TutorResponseTimeFrame } from '../entities/tutor-response-time-frame.entity';
import { TutorResponseTimeFramesService } from './tutor-response-time-frames.service';

@ApiTags('tutor response time frames')
@Controller('tutor-response-time-frames')
export class TutorResponseTimeFramesController {
  constructor(
    private readonly tutorResponseTimeFramesService: TutorResponseTimeFramesService
  ) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, type: TutorResponseTimeFrame })
  getLessonTimeFrames(): Promise<TutorResponseTimeFrame[]> {
    return this.tutorResponseTimeFramesService.getTutorResponseTimeFrames();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, type: TutorResponseTimeFrame })
  getLessonTimeFrame(
    @Param('id', ParseIntPipe) id: number
  ): Promise<TutorResponseTimeFrame> {
    return this.tutorResponseTimeFramesService.getTutorResponseTimeFrame(id);
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 201, type: TutorResponseTimeFrame })
  createLessonTimeFrame(
    @Body() createTutorResponseTimeFrameDto: CreateTutorResponseTimeFrameDto
  ): Promise<TutorResponseTimeFrame> {
    return this.tutorResponseTimeFramesService.createTutorResponseTimeFrame(
      createTutorResponseTimeFrameDto
    );
  }

  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, type: TutorResponseTimeFrame })
  updateLessonTimeFrame(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTutorResponseTimeFrameDto: UpdateTutorResponseTimeFrameDto
  ): Promise<TutorResponseTimeFrame> {
    return this.tutorResponseTimeFramesService.updateTutorResponseTimeFrame(
      id,
      updateTutorResponseTimeFrameDto
    );
  }

  @Delete(':id')
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  deleteLessonTimeFrame(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tutorResponseTimeFramesService.deleteTutorResponseTimeFrame(id);
  }
}
