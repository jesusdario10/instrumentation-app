import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Solution } from '../solutions/entities/solution.entity';
import { dataSeed } from './data';
import { LaboratoryRecord } from '../laboratory-records/entities/laboratory-record.entity';
import { dataSeedLab } from './data-lab';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Solution.name)
    private readonly solutionModel: Model<Solution>,
    @InjectModel(LaboratoryRecord.name)
    private readonly labRegisterModel: Model<LaboratoryRecord>,
  ) {}
  async executeSeed() {
    await this.solutionModel.deleteMany({});

    await this.solutionModel.insertMany([...dataSeed]);

    return 'This action adds a new seed';
  }
  async executeSeedLab() {
    await this.labRegisterModel.deleteMany({});

    await this.labRegisterModel.insertMany([...dataSeedLab]);

    return 'This action adds a new seed';
  }
}
