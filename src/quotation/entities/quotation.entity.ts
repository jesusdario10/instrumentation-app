import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SolutionType } from '../../const/const';

export enum QuotationStatus {
  PENDING = 'pending',
  OK = 'ok',
}

class Service {
  @Prop({ type: String, enum: Object.values(SolutionType) })
  type: SolutionType;

  @Prop({ type: String })
  scope: string;

  @Prop({ type: String })
  notes: string;

  @Prop({ type: Number })
  hours: number;

  @Prop({ type: Number })
  units: number;

  @Prop({ type: Number })
  price: number;
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

  @Prop({ type: [Service], required: true })
  services: Service[];

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
