import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { SolutionsModule } from '../solutions/solutions.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [SolutionsModule],
})
export class SeedModule {}
