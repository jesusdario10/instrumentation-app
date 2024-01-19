import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Solution } from '../solutions/entities/solution.entity';
import { dataSeed } from './data';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Solution.name)
    private readonly solutionModel: Model<Solution>,
  ) {}
  async executeSeed() {
    await this.solutionModel.deleteMany({});

    await this.solutionModel.insertMany([...dataSeed]);

    return 'This action adds a new seed';
  }
}
