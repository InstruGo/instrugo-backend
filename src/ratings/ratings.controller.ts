import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
  ClassSerializerInterceptor,
  UseInterceptors,
  HttpCode,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { RatingsService } from './ratings.service';
import { FilterRatingDto } from './dto/filter-rating.dto';
import { Rating } from './entities/rating.entity';
import { RateLessonDto } from './dto/rate-lesson.dto';
import { LeaveFeedbackDto } from './dto/leave-feedback.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/auth/entities/user.role.enum';

@ApiTags('ratings')
@Controller('ratings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, type: Rating })
  getRatings(@Query() filterRatingDto: FilterRatingDto): Promise<Rating[]> {
    return this.ratingsService.getRatings(filterRatingDto);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, type: Rating })
  getRating(@Param('id', ParseIntPipe) id: number): Promise<Rating> {
    return this.ratingsService.getRating(id);
  }

  @Patch('rate/:lessonId')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, type: Rating })
  rateLesson(
    @Param('lessonId', ParseIntPipe) lessonId: number,
    @Body() rateLessonDto: RateLessonDto
  ): Promise<Rating> {
    return this.ratingsService.rateLesson(lessonId, rateLessonDto);
  }

  @Patch('feedback/:lessonId')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, type: Rating })
  @Roles(UserRole.TUTOR, UserRole.ADMIN)
  leaveFeedback(
    @Param('lessonId', ParseIntPipe) lessonId: number,
    @Body() leaveFeedbackDto: LeaveFeedbackDto
  ): Promise<Rating> {
    return this.ratingsService.leaveFeedback(lessonId, leaveFeedbackDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  deleteRating(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.ratingsService.deleteRating(id);
  }
}
