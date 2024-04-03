import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { SolutionsModule } from '../solutions/solutions.module';
import { LaboratoryRecordsModule } from '../laboratory-records/laboratory-records.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [SolutionsModule, LaboratoryRecordsModule],
})
export class SeedModule {}
