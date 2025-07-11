import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class LaboratoryRecord extends Document {
  @Prop({ type: String })
  type: string;
  @Prop({ type: String, unique: true })
  scope: string;
  @Prop({
    type: Number,
    min: 1,
    validate: {
      validator: Number.isInteger,
      message: 'order must be an integer',
    },
  })
  order: number;
  @Prop({
    type: Number,
    min: 1,
  })
  totalHours: number;
  @Prop({
    type: Number,
    min: 1,
  })
  unitValue: number;
}

export const LaboratoryRecordSchema =
  SchemaFactory.createForClass(LaboratoryRecord);
