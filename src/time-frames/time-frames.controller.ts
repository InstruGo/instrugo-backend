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

import { TimeFramesService } from './time-frames.service';
import { TimeFrame } from './entities/time-frame.entity';
import { CreateTimeFrameDto } from './dto/create-lesson-time-frame.dto';
import { UpdateTimeFrameDto } from './dto/update-lesson-time-frame.dto';

@ApiTags('time frames')
@Controller('time-frames')
export class TimeFramesController {
  constructor(private readonly timeFramesService: TimeFramesService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, type: TimeFrame })
  getTimeFrames(): Promise<TimeFrame[]> {
    return this.timeFramesService.getTimeFrames();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, type: TimeFrame })
  getTimeFrame(@Param('id', ParseIntPipe) id: number): Promise<TimeFrame> {
    return this.timeFramesService.getTimeFrame(id);
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 201, type: TimeFrame })
  createTimeFrame(
    @Body() createTimeFrameDto: CreateTimeFrameDto
  ): Promise<TimeFrame> {
    return this.timeFramesService.createTimeFrame(createTimeFrameDto);
  }

  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, type: TimeFrame })
  updateTimeFrame(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTimeFrameDto: UpdateTimeFrameDto
  ): Promise<TimeFrame> {
    return this.timeFramesService.updateTimeFrame(id, updateTimeFrameDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  deleteTimeFrame(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.timeFramesService.deleteTimeFrame(id);
  }
}
