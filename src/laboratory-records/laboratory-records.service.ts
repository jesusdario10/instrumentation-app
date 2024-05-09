import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateLaboratoryRecordDto } from './dto/create-laboratory-record.dto';
import { UpdateLaboratoryRecordDto } from './dto/update-laboratory-record.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LaboratoryRecord } from './entities/laboratory-record.entity';

@Injectable()
export class LaboratoryRecordsService {
  constructor(
    @InjectModel(LaboratoryRecord.name)
    private readonly laboratoryRecordModel: Model<LaboratoryRecord>,
  ) {}

  async create(createLaboratoryRecordDto: CreateLaboratoryRecordDto) {
    try {
      const lr = await this.laboratoryRecordModel.create(
        createLaboratoryRecordDto,
      );
      return lr;
    } catch (error) {
      if (error.code === 11000)
        throw new BadRequestException(`An error has occurred`);
      else
        throw new InternalServerErrorException(
          `Can't create field - Check logs`,
        );
    }
  }

  async byId(id: string) {
    const lr = await this.laboratoryRecordModel.findById(id);
    if (!lr) throw new NotFoundException(`Data not found`);
    return lr;
  }

  async update(
    id: string,
    updateLaboratoryRecordDto: UpdateLaboratoryRecordDto,
  ) {
    const updatedlr = await this.laboratoryRecordModel.findByIdAndUpdate(
      id,
      updateLaboratoryRecordDto,
      { new: true },
    );

    if (!updatedlr) {
      throw new NotFoundException(`laboratoryRecord with ID ${id} not found`);
    }
    return updatedlr;
  }

  async remove(id: string) {
    const lr = await this.byId(id);

    await this.laboratoryRecordModel.deleteOne({ _id: lr._id });

    return { message: `laboratoryRecord with ID ${id} has been removed` };
  }

  async getDistinctTypes(): Promise<string[]> {
    const distinctTypes = await this.laboratoryRecordModel
      .distinct('type')
      .exec();
    return distinctTypes.map((type) => type.toString());
  }

  async getRecordsByType(type: string): Promise<LaboratoryRecord[]> {
    const records = await this.laboratoryRecordModel
      .find({ type })
      .sort({ order: 1 })
      .exec();
    return records;
  }
}
