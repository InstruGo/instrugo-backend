import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ParseIntPipe,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { TutorResponsesService } from './tutor-responses.service';
import { CreateTutorResponseDto } from './dto/create-tutor-response.dto';
import { UpdateTutorResponseDto } from './dto/update-tutor-response.dto';
import { TutorResponse } from './entities/tutor-response.entity';
import { FilterTutorResponseDto } from './dto/filter-tutor-response.dto';

@ApiTags('tutor responses')
@Controller('tutor-responses')
export class TutorResponsesController {
  constructor(private readonly tutorResponsesService: TutorResponsesService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, type: TutorResponse })
  getTutorResponses(
    @Body() filterTutorResponseDto: FilterTutorResponseDto
  ): Promise<TutorResponse[]> {
    return this.tutorResponsesService.getTutorResponses(filterTutorResponseDto);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, type: TutorResponse })
  getTutorResponse(
    @Param('id', ParseIntPipe) id: number
  ): Promise<TutorResponse> {
    return this.tutorResponsesService.getTutorResponse(+id);
  }
  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 201, type: TutorResponse })
  createTutorResponse(
    @Body() createTutorResponseDto: CreateTutorResponseDto
  ): Promise<TutorResponse> {
    return this.tutorResponsesService.createTutorResponse(
      createTutorResponseDto
    );
  }

  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, type: TutorResponse })
  updateTutorResponse(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTutorResponseDto: UpdateTutorResponseDto
  ) {
    return this.tutorResponsesService.updateTutorResponse(
      +id,
      updateTutorResponseDto
    );
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200 })
  deleteTutorResponse(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tutorResponsesService.deleteTutorResponse(+id);
  }
}
