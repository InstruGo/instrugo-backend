import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { FilterRatingDto } from './dto/filter-rating.dto';
import { Rating } from './entities/rating.entity';
import { UpdateRatingDto } from './dto/update-rating.dto';

@ApiTags('ratings')
@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Get()
  @ApiResponse({ status: 200, type: Rating })
  getRatings(@Body() filterRatingDto: FilterRatingDto): Promise<Rating[]> {
    return this.ratingsService.getRatings(filterRatingDto);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Rating })
  getRating(@Param('id', ParseIntPipe) id: number): Promise<Rating> {
    return this.ratingsService.getRating(id);
  }

  @Post()
  @ApiResponse({ status: 201, type: Rating })
  createRating(@Body() createRatingDto: CreateRatingDto): Promise<Rating> {
    return this.ratingsService.createRating(createRatingDto);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, type: Rating })
  updateRating(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRatingDto: UpdateRatingDto
  ): Promise<Rating> {
    return this.ratingsService.updateRating(id, updateRatingDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204 })
  deleteRating(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.ratingsService.deleteRating(id);
  }
}
