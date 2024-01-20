import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { Quotation } from './entities/quotation.entity';

@Injectable()
export class QuotationService {
  constructor(
    @InjectModel(Quotation.name) private quotationModel: Model<Quotation>,
  ) {}

  async create(createQuotationDto: CreateQuotationDto): Promise<Quotation> {
    const lastQuotation = await this.quotationModel
      .findOne()
      .sort({ consecutive: -1 })
      .limit(1)
      .exec();

    const consecutive = lastQuotation ? lastQuotation.consecutive + 1 : 1;

    const totalPrice = createQuotationDto.services.reduce(
      (total, service) => total + service.units * service.price,
      0,
    );
    const totalTime = createQuotationDto.services.reduce(
      (total, service) => total + service.units * service.hours,
      0,
    );

    const createdQuotation = new this.quotationModel({
      ...createQuotationDto,
      consecutive,
      totalPrice,
      executionTime: totalTime,
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
