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
  UseGuards,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { LessonsService } from './lessons.service';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonDto } from './dto/lessons/create-lesson.dto';
import { FilterLessonDto } from './dto/lessons/filter-lesson.dto';
import { UpdateLessonDto } from './dto/lessons/update-lesson.dto';
import { User } from '../auth/user.decorator';
import { User as UserEntity } from '../auth/entities/user.entity';
import { ResolveLessonRequestDto } from './dto/lessons/resolve-lesson-request.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from '../auth/entities/user.role.enum';
import { FilterPoolDto } from './dto/lessons/filter-pool.dto';
import { NotFoundException } from '@nestjs/common';

@ApiTags('lessons')
@Controller('lessons')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({ type: [Lesson] })
  getLessons(
    @Query() filterLessonDto: FilterLessonDto,
    @User() user: UserEntity
  ): Promise<Lesson[]> {
    return this.lessonsService.getLessons(filterLessonDto, user.id);
  }

  @Get('pool')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({ type: [Lesson] })
  getPublicPool(
    @Query() filterPoolDto: FilterPoolDto,
    @User() user: UserEntity
  ): Promise<Lesson[]> {
    if (user.role === UserRole.STUDENT) {
      throw new NotFoundException();
    }

    return this.lessonsService.getPublicPool(filterPoolDto);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({ type: Lesson })
  getLesson(@Param('id', ParseIntPipe) id: number): Promise<Lesson> {
    return this.lessonsService.getLesson(id);
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiCreatedResponse({ type: Lesson })
  createLesson(
    @User() user: UserEntity,
    @Body() createLessonDto: CreateLessonDto
  ): Promise<Lesson> {
    return this.lessonsService.createLesson(user, createLessonDto);
  }

  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({ type: Lesson })
  updateLesson(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLessonDto: UpdateLessonDto
  ): Promise<Lesson> {
    return this.lessonsService.updateLesson(id, updateLessonDto);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  @HttpCode(204)
  deleteLesson(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.lessonsService.deleteLesson(id);
  }

  @Post('resolve/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({ type: Lesson })
  resolveLessonRequest(
    @Param('id', ParseIntPipe) id: number,
    @Body() resolveLessonRequestDto: ResolveLessonRequestDto
  ): Promise<Lesson> {
    return this.lessonsService.resolveLessonRequest(
      id,
      resolveLessonRequestDto.tutorResponseId,
      resolveLessonRequestDto.timeFrameId
    );
  }

  @Put('cancel/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({ type: Lesson })
  cancelPendingLesson(@Param('id', ParseIntPipe) id: number) {
    return this.lessonsService.cancelPendingLesson(id);
  }
}
