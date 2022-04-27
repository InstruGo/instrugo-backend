import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { SubjectsService } from './subjects.service';
import { Subject } from '../entities/subject.entity';
import { CreateSubjectDto } from '../dto/subjects/create-subject.dto';
import { FilterSubjectDto } from '../dto/subjects/filter-subject.dto';
import { UpdateSubjectDto } from '../dto/subjects/update-subject.dto';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/auth/entities/user.role.enum';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';

@ApiTags('subjects')
@Controller('subjects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, type: Subject })
  getSubjects(@Body() filterSubjectDto: FilterSubjectDto): Promise<Subject[]> {
    return this.subjectsService.getSubjects(filterSubjectDto);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, type: Subject })
  getSubject(@Param('id', ParseIntPipe) id: number): Promise<Subject> {
    return this.subjectsService.getSubject(id);
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 201, type: Subject })
  @Roles(UserRole.ADMIN)
  createSubject(@Body() createSubjectDto: CreateSubjectDto): Promise<Subject> {
    return this.subjectsService.createSubject(createSubjectDto);
  }

  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, type: Subject })
  @Roles(UserRole.ADMIN)
  updateSubject(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLessonDto: UpdateSubjectDto
  ): Promise<Subject> {
    return this.subjectsService.updateSubject(id, updateLessonDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  @Roles(UserRole.ADMIN)
  deleteSubject(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.subjectsService.deleteSubject(id);
  }
}
