import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum QuotationStatus {
  PENDING = 'pending',
  OK = 'ok',
}

export class ServiceQuotation {
  @Prop({ type: String })
  type: string;

  @Prop({ type: String })
  scope: string;

  @Prop({ type: Number })
  hours: number;

  @Prop({ type: Number })
  units: number;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: String })
  notes?: string;
}

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class Quotation extends Document {
  @Prop({ type: Number, required: true, unique: true })
  consecutive: number;

  @Prop({ type: String, required: true })
  nit: string;

  @Prop({ type: String, required: true })
  legalName: string;

  @Prop({ type: String, required: true })
  phoneNumber: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: [ServiceQuotation], required: true })
  services: ServiceQuotation[];

  @Prop({ type: Number, required: true })
  totalPrice: number;

  @Prop({ type: Number, required: true })
  executionTime: number;

  @Prop({
    type: String,
    required: true,
    enum: Object.values(QuotationStatus),
    default: QuotationStatus.PENDING,
  })
  status: string;
}

export const QuotationSchema = SchemaFactory.createForClass(Quotation);
