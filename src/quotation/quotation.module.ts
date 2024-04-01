import { Module } from '@nestjs/common';
import { QuotationService } from './quotation.service';
import { QuotationController } from './quotation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Quotation, QuotationSchema } from './entities/quotation.entity';
import { SolutionsModule } from '../solutions/solutions.module';
import { LaboratoryRecordsModule } from '../laboratory-records/laboratory-records.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Quotation.name,
        schema: QuotationSchema,
      },
    ]),
    SolutionsModule,
    LaboratoryRecordsModule,
  ],
  controllers: [QuotationController],
  providers: [QuotationService],
})
export class QuotationModule {}
