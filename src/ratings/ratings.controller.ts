import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
  ClassSerializerInterceptor,
  UseInterceptors,
  HttpCode,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { FilterRatingDto } from './dto/filter-rating.dto';
import { Rating } from './entities/rating.entity';
import { RateLessonDto } from './dto/rate-lesson.dto';
import { LeaveFeedbackDto } from './dto/leave-feedback.dto';

@ApiTags('ratings')
@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, type: Rating })
  getRatings(@Body() filterRatingDto: FilterRatingDto): Promise<Rating[]> {
    return this.ratingsService.getRatings(filterRatingDto);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, type: Rating })
  getRating(@Param('id', ParseIntPipe) id: number): Promise<Rating> {
    return this.ratingsService.getRating(id);
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 201, type: Rating })
  createRating(@Body() createRatingDto: CreateRatingDto): Promise<Rating> {
    return this.ratingsService.createRating(createRatingDto);
  }

  @Patch('rate/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, type: Rating })
  rateLesson(
    @Param('id', ParseIntPipe) id: number,
    @Body() rateLessonDto: RateLessonDto
  ): Promise<Rating> {
    return this.ratingsService.updateRating(id, rateLessonDto);
  }

  @Patch('feedback/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, type: Rating })
  leaveFeedback(
    @Param('id', ParseIntPipe) id: number,
    @Body() leaveFeedbackDto: LeaveFeedbackDto
  ): Promise<Rating> {
    return this.ratingsService.updateRating(id, leaveFeedbackDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  deleteRating(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.ratingsService.deleteRating(id);
  }
}
