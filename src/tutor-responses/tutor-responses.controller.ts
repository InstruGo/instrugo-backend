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
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { TutorResponsesService } from './tutor-responses.service';
import { CreateTutorResponseDto } from './dto/create-tutor-response.dto';
import { UpdateTutorResponseDto } from './dto/update-tutor-response.dto';
import { TutorResponse } from './entities/tutor-response.entity';
import { FilterTutorResponseDto } from './dto/filter-tutor-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { User } from '../auth/user.decorator';
import { User as UserEntity } from '../auth/entities/user.entity';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/auth/entities/user.role.enum';

@ApiTags('tutor responses')
@Controller('tutor-responses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TutorResponsesController {
  constructor(private readonly tutorResponsesService: TutorResponsesService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, type: TutorResponse })
  @Roles(UserRole.TUTOR, UserRole.ADMIN)
  getTutorResponses(
    @User() user: UserEntity,
    @Query() filterTutorResponseDto: FilterTutorResponseDto
  ): Promise<TutorResponse[]> {
    return this.tutorResponsesService.getTutorResponses(
      user,
      filterTutorResponseDto
    );
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, type: TutorResponse })
  @Roles(UserRole.TUTOR, UserRole.ADMIN)
  getTutorResponse(
    @User() user: UserEntity,
    @Param('id', ParseIntPipe) id: number
  ): Promise<TutorResponse> {
    return this.tutorResponsesService.getTutorResponse(user, id);
  }

  @Post('/:lessonId/respond')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 201, type: TutorResponse })
  @Roles(UserRole.TUTOR, UserRole.ADMIN)
  createTutorResponse(
    @User() user: UserEntity,
    @Param('lessonId', ParseIntPipe) lessonId: number,
    @Body() createTutorResponseDto: CreateTutorResponseDto
  ): Promise<TutorResponse> {
    return this.tutorResponsesService.createTutorResponse(
      user,
      lessonId,
      createTutorResponseDto
    );
  }

  @Patch('/:lessonId/respond')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, type: TutorResponse })
  @Roles(UserRole.TUTOR, UserRole.ADMIN)
  updateTutorResponse(
    @User() user: UserEntity,
    @Param('lessonId', ParseIntPipe) lessonId: number,
    @Body() updateTutorResponseDto: UpdateTutorResponseDto
  ) {
    return this.tutorResponsesService.updateTutorResponse(
      user,
      lessonId,
      updateTutorResponseDto
    );
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200 })
  @Roles(UserRole.TUTOR, UserRole.ADMIN)
  deleteTutorResponse(
    @User() user: UserEntity,
    @Param('id', ParseIntPipe) id: number
  ): Promise<void> {
    return this.tutorResponsesService.deleteTutorResponse(user, id);
  }
}
