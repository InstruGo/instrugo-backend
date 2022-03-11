import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

import { AuthModule } from './auth/auth.module';
import { LessonsModule } from './lessons/lessons.module';
import { RatingsModule } from './ratings/ratings.module';
import { TutorResponsesModule } from './tutor-responses/tutor-responses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        typeOrmConfig(configService),
    }),
    AuthModule,
    LessonsModule,
    RatingsModule,
    TutorResponsesModule,
  ],
})
export class AppModule {}
