import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SolutionType } from '../../const/const';

@Schema()
export class Solution extends Document {
  @Prop({
    type: String,
    enum: SolutionType,
  })
  type: string;
  @Prop({ type: String, unique: true })
  scope: string;
  @Prop({ type: String })
  notes: string;
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
  hoursEquipment: number;
  @Prop({
    type: Number,
    min: 0,
  })
  totalHours: number;
  @Prop({
    type: Number,
    min: 1,
  })
  unitValue: number;
}

export const SolutionSchema = SchemaFactory.createForClass(Solution);
