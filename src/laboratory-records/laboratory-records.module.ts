import { Module } from '@nestjs/common';
import { LaboratoryRecordsService } from './laboratory-records.service';
import { LaboratoryRecordsController } from './laboratory-records.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import {
  LaboratoryRecord,
  LaboratoryRecordSchema,
} from './entities/laboratory-record.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: LaboratoryRecord.name,
        schema: LaboratoryRecordSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [LaboratoryRecordsController],
  providers: [LaboratoryRecordsService],
  exports: [MongooseModule, LaboratoryRecordsModule],
})
export class LaboratoryRecordsModule {}
