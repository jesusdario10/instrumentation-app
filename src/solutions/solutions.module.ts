import { Module } from '@nestjs/common';
import { SolutionsService } from './solutions.service';
import { SolutionsController } from './solutions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Solution, SolutionSchema } from './entities/solution.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Solution.name,
        schema: SolutionSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [SolutionsController],
  providers: [SolutionsService],
  exports: [MongooseModule, SolutionsModule],
})
export class SolutionsModule {}
