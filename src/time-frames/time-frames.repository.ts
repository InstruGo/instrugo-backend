import { Repository, EntityRepository } from 'typeorm';
import { TimeFrame } from './entities/time-frame.entity';
import { CreateTimeFrameDto } from './dto/create-lesson-time-frame.dto';
import { UpdateTimeFrameDto } from './dto/update-lesson-time-frame.dto';

@EntityRepository(TimeFrame)
export class TimeFrameRepository extends Repository<TimeFrame> {
  async getTimeFrames() {
    const query = this.createQueryBuilder('lesson-time-frame');
    const lessonTimeFrames = await query.getMany();

    return lessonTimeFrames;
  }

  async createTimeFrame(
    createLessonTimeFrameDto: CreateTimeFrameDto
  ): Promise<TimeFrame> {
    const { startTime, endTime } = createLessonTimeFrameDto;

    const lessonTimeFrame = new TimeFrame();

    lessonTimeFrame.startTime = new Date(startTime);
    lessonTimeFrame.endTime = new Date(endTime);

    await lessonTimeFrame.save();
    return lessonTimeFrame;
  }

  async updateTimeFrame(
    lessonTimeFrame: TimeFrame,
    updateLessonTimeFrameDto: UpdateTimeFrameDto
  ): Promise<TimeFrame> {
    const { startTime, endTime } = updateLessonTimeFrameDto;

    if (startTime) lessonTimeFrame.startTime = new Date(startTime);
    if (endTime) lessonTimeFrame.endTime = new Date(endTime);

    await lessonTimeFrame.save();
    return lessonTimeFrame;
  }

  async createTimeFrames(
    lessonTimeFrameDtos: CreateTimeFrameDto[]
  ): Promise<TimeFrame[]> {
    const lessonTimeFrames: TimeFrame[] = [];

    await Promise.all(
      lessonTimeFrameDtos.map(async (lessonTimeFrameDto) => {
        const lessonTimeFrame = await this.createTimeFrame(lessonTimeFrameDto);

        lessonTimeFrames.push(lessonTimeFrame);
        await lessonTimeFrame.save();
      })
    );

    return lessonTimeFrames;
  }

  async deleteTimeFrames(lessonTimeFrames: TimeFrame[]): Promise<void> {
    await Promise.all(
      lessonTimeFrames.map(
        async (lessonTimeFrame) => await lessonTimeFrame.remove()
      )
    );
  }
}
