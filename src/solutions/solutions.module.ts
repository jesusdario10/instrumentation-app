import { Module } from '@nestjs/common';
import { SolutionsService } from './solutions.service';
import { SolutionsController } from './solutions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Solution, SolutionSchema } from './entities/solution.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Solution.name,
        schema: SolutionSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
  controllers: [SolutionsController],
  providers: [SolutionsService],
})
export class SolutionsModule {}
