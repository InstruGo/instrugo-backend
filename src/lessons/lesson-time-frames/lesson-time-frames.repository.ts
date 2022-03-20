import { Repository, EntityRepository } from 'typeorm';

import { LessonTimeFrame } from '../entities/lesson-time-frame.entity';
import { CreateLessonTimeFrameDto } from '../dto/lesson-time-frames/create-lesson-time-frame.dto';
import { UpdateLessonTimeFrameDto } from '../dto/lesson-time-frames/update-lesson-time-frame.dto';

@EntityRepository(LessonTimeFrame)
export class LessonTimeFrameRepository extends Repository<LessonTimeFrame> {
  async getLessonTimeFrames() {
    const query = this.createQueryBuilder('lesson-time-frame');
    const lessonTimeFrames = await query.getMany();

    return lessonTimeFrames;
  }

  async createLessonTimeFrame(
    createLessonTimeFrameDto: CreateLessonTimeFrameDto
  ): Promise<LessonTimeFrame> {
    const { startTime, endTime } = createLessonTimeFrameDto;

    const lessonTimeFrame = new LessonTimeFrame();

    lessonTimeFrame.startTime = new Date(startTime);
    lessonTimeFrame.endTime = new Date(endTime);

    await lessonTimeFrame.save();
    return lessonTimeFrame;
  }

  async updateLessonTimeFrame(
    lessonTimeFrame: LessonTimeFrame,
    updateLessonTimeFrameDto: UpdateLessonTimeFrameDto
  ): Promise<LessonTimeFrame> {
    const { startTime, endTime } = updateLessonTimeFrameDto;

    if (startTime) lessonTimeFrame.startTime = new Date(startTime);
    if (endTime) lessonTimeFrame.endTime = new Date(endTime);

    await lessonTimeFrame.save();
    return lessonTimeFrame;
  }

  async createLessonTimeFrames(
    lessonTimeFrameDtos: CreateLessonTimeFrameDto[]
  ): Promise<LessonTimeFrame[]> {
    const lessonTimeFrames: LessonTimeFrame[] = [];

    await Promise.all(
      lessonTimeFrameDtos.map(async (lessonTimeFrameDto) => {
        const lessonTimeFrame = await this.createLessonTimeFrame(
          lessonTimeFrameDto
        );

        lessonTimeFrames.push(lessonTimeFrame);
        await lessonTimeFrame.save();
      })
    );

    return lessonTimeFrames;
  }

  async deleteLessonTimeFrames(
    lessonTimeFrames: LessonTimeFrame[]
  ): Promise<void> {
    await Promise.all(
      lessonTimeFrames.map(
        async (lessonTimeFrame) => await lessonTimeFrame.remove()
      )
    );
  }
}
