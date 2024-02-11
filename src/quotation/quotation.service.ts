import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDataByQuotationDto } from './dto/create-data-by-quotation.dto';

import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { Quotation, ServiceQuotation } from './entities/quotation.entity';
import { Solution } from '../solutions/entities/solution.entity';

@Injectable()
export class QuotationService {
  constructor(
    @InjectModel(Quotation.name) private quotationModel: Model<Quotation>,
    @InjectModel(Solution.name) private solutionModel: Model<Solution>,
  ) {}

  async create(
    createDataByQuotationDto: CreateDataByQuotationDto,
  ): Promise<any> {
    const lastQuotation = await this.quotationModel
      .findOne()
      .sort({ consecutive: -1 })
      .limit(1)
      .exec();
    const consecutive = lastQuotation ? lastQuotation.consecutive + 1 : 1;

    let totalPrice = 0;
    let totalTime = 0;

    const solutions: ServiceQuotation[] = [];

    for (const service of createDataByQuotationDto.services) {
      const solution = await this.solutionModel.findById(service._id).exec();
      if (!solution) {
        throw new NotFoundException(
          `Solution with ID ${service._id} not found`,
        );
      }

      solutions.push({
        type: solution.type,
        scope: solution.scope,
        notes: solution.notes,
        hours: solution.totalHours,
        price: solution.unitValue,
        units: service.inputValue,
      });
      totalPrice += service.inputValue * solution.unitValue;
      totalTime += service.inputValue * solution.totalHours;
    }

    const createdQuotation = new this.quotationModel({
      nit: createDataByQuotationDto.nit,
      legalName: createDataByQuotationDto.legalName,
      phoneNumber: createDataByQuotationDto.phoneNumber,
      email: createDataByQuotationDto.email,
      consecutive,
      totalPrice,
      executionTime: totalTime,
      services: solutions,
    });

    try {
      return await createdQuotation.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new InternalServerErrorException('Consecutive is already exist');
      } else {
        throw error;
      }
    }
  }

  async findAll(): Promise<Quotation[]> {
    return this.quotationModel.find().exec();
  }

  async findOne(consecutive: string): Promise<Quotation> {
    const quotation = await this.quotationModel
      .findOne({ consecutive: +consecutive })
      .exec();
    if (!quotation) {
      this.throwQuotationNotFoundException();
    }
    return quotation;
  }

  async update(
    consecutive: string,
    updateQuotationDto: UpdateQuotationDto,
  ): Promise<Quotation> {
    const updatedQuotation = await this.quotationModel
      .findOneAndUpdate({ consecutive: +consecutive }, updateQuotationDto, {
        new: true,
      })
      .exec();

    if (!updatedQuotation) {
      this.throwQuotationNotFoundException();
    }

    return updatedQuotation;
  }

  async remove(consecutive: string): Promise<any> {
    const result = await this.quotationModel
      .deleteOne({ consecutive: +consecutive })
      .exec();
    if (result.deletedCount === 0) {
      this.throwQuotationNotFoundException();
    }
    return result;
  }

  private throwQuotationNotFoundException() {
    throw new NotFoundException('Quotation not found');
  }
}
