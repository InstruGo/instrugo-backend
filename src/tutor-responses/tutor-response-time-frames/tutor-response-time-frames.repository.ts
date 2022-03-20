import { Repository, EntityRepository } from 'typeorm';

import { TutorResponseTimeFrame } from '../entities/tutor-response-time-frame.entity';
import { CreateTutorResponseTimeFrameDto } from '../dto/create-tutor-response-time-frame.dto';
import { UpdateTutorResponseTimeFrameDto } from '../dto/update-tutor-response-time-frame.dto';

@EntityRepository(TutorResponseTimeFrame)
export class TutorResponseTimeFrameRepository extends Repository<TutorResponseTimeFrame> {
  async getTutorResponseTimeFrames() {
    const query = this.createQueryBuilder('tutor-response-time-frame');
    const tutorResponseTimeFrames = await query.getMany();

    return tutorResponseTimeFrames;
  }

  async createTutorResponseTimeFrame(
    createTutorResponseTimeFrameDto: CreateTutorResponseTimeFrameDto
  ): Promise<TutorResponseTimeFrame> {
    const { startTime, endTime } = createTutorResponseTimeFrameDto;

    const tutorResponseTimeFrame = new TutorResponseTimeFrame();

    tutorResponseTimeFrame.startTime = new Date(startTime);
    tutorResponseTimeFrame.endTime = new Date(endTime);

    await tutorResponseTimeFrame.save();
    return tutorResponseTimeFrame;
  }

  async updateTutorResponseTimeFrame(
    tutorResponseTimeFrame: TutorResponseTimeFrame,
    updateTutorResponseTimeFrameDto: UpdateTutorResponseTimeFrameDto
  ): Promise<TutorResponseTimeFrame> {
    const { startTime, endTime } = updateTutorResponseTimeFrameDto;

    if (startTime) tutorResponseTimeFrame.startTime = new Date(startTime);
    if (endTime) tutorResponseTimeFrame.endTime = new Date(endTime);

    await tutorResponseTimeFrame.save();
    return tutorResponseTimeFrame;
  }

  async createTutorResponseTimeFrames(
    tutorResponseTimeFrameDtos: CreateTutorResponseTimeFrameDto[]
  ): Promise<TutorResponseTimeFrame[]> {
    const tutorResponseTimeFrames: TutorResponseTimeFrame[] = [];

    await Promise.all(
      tutorResponseTimeFrameDtos.map(async (tutorResponseTimeFrameDto) => {
        const tutorResponseTimeFrame = await this.createTutorResponseTimeFrame(
          tutorResponseTimeFrameDto
        );

        tutorResponseTimeFrames.push(tutorResponseTimeFrame);
        await tutorResponseTimeFrame.save();
      })
    );

    return tutorResponseTimeFrames;
  }

  async deleteTutorResponseTimeFrames(
    tutorResponseTimeFrames: TutorResponseTimeFrame[]
  ): Promise<void> {
    await Promise.all(
      tutorResponseTimeFrames.map(
        async (tutorResponseTimeFrame) => await tutorResponseTimeFrame.remove()
      )
    );
  }
}
