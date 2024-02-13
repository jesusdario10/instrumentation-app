import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGODB: Joi.required(),
  PORT: Joi.number().default(3005),
  SEED: Joi.required(),
  HOSTSMTP: Joi.required(),
  PORTSMTP: Joi.number().default(25),
  USERSMTP: Joi.required(),
  PASSWORDSMTP: Joi.required(),
});
