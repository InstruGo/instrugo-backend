import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { FilterRatingDto } from './dto/filter-rating.dto';
import { Rating } from './entities/rating.entity';

@ApiTags('ratings')
@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Get()
  @ApiResponse({ status: 200, type: Rating })
  findAll(@Body() filterRatingDto: FilterRatingDto): Promise<Rating[]> {
    return this.ratingsService.findAll(filterRatingDto);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Rating })
  findOne(@Param('id') id: string): Promise<Rating> {
    return this.ratingsService.findOne(+id);
  }

  @Post()
  @ApiResponse({ status: 201, type: Rating })
  create(@Body() createRatingDto: CreateRatingDto): Promise<Rating> {
    return this.ratingsService.create(createRatingDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204 })
  remove(@Param('id') id: string): Promise<void> {
    return this.ratingsService.remove(+id);
  }
}
