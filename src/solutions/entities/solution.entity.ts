import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class Solution extends Document {
  @Prop({ type: String })
  type: string;
  @Prop({ type: String })
  code: string; //rating or another code of solutions
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
  @Prop({ type: String, default: 'Valves' })
  group: string;
}

export const SolutionSchema = SchemaFactory.createForClass(Solution);
