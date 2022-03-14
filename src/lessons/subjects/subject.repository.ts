import { Repository, EntityRepository } from 'typeorm';

import { Subject } from '../entities/subject.entity';
import { CreateSubjectDto } from '../dto/subjects/create-subject.dto';
import { FilterSubjectDto } from '../dto/subjects/filter-subject.dto';
import { UpdateSubjectDto } from '../dto/subjects/update-subject.dto';

@EntityRepository(Subject)
export class SubjectRepository extends Repository<Subject> {
  async getSubjects(filterSubjectDto: FilterSubjectDto): Promise<Subject[]> {
    const { name } = filterSubjectDto;
    const query = this.createQueryBuilder('subject');

    if (name) {
      query.andWhere('subject.name = :name', { name });
    }

    const subjects = await query.getMany();
    return subjects;
  }

  async createSubject(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const { name } = createSubjectDto;

    const subject = new Subject();
    subject.name = name;

    await subject.save();
    return subject;
  }

  async updateSubject(
    subject: Subject,
    updateSubjectDto: UpdateSubjectDto
  ): Promise<Subject> {
    const { name } = updateSubjectDto;

    if (name) subject.name = name;

    await subject.save();
    return subject;
  }
}
