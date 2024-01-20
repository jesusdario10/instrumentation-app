import { Module } from '@nestjs/common';
import { QuotationService } from './quotation.service';
import { QuotationController } from './quotation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Quotation, QuotationSchema } from './entities/quotation.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Quotation.name,
        schema: QuotationSchema,
      },
    ]),
  ],
  controllers: [QuotationController],
  providers: [QuotationService],
})
export class QuotationModule {}
