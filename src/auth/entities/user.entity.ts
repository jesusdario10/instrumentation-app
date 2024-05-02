import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude } from 'class-transformer';
import { IsString, Matches, MinLength } from 'class-validator';

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class User extends Document {
  @Prop({ type: String, required: true })
  @MinLength(6)
  nit: string;

  @Prop({ type: String, required: true })
  companyName: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({
    type: String,
    required: true,
    validate: {
      validator: function (value: string) {
        return /^\d{6,}$/.test(value);
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
  })
  @IsString()
  @MinLength(6)
  phoneNumber: string;

  @Prop({
    type: String,
    required: true,
    validate: {
      validator: function (value: string) {
        // The regular expression validates if the value contains at least 8 characters,
        // a lowercase letter, an uppercase letter, a number and a symbol.
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value);
      },
      message: (props) => `${props.value} is not a valid password`,
    },
  })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    message:
      'Password must contain at least one lowercase, one uppercase, one number, and one special character',
  })
  @Exclude()
  password: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: [String], default: [] })
  roles: string[];

  // Method to manually exclude field from response
  toJSON() {
    return this.toObject({ virtuals: true });
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});
