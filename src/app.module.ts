import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';

import { QuotationModule } from './quotation/quotation.module';
import { SolutionsModule } from './solutions/solutions.module';
import { AuthModule } from './auth/auth.module';

import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';
import { LaboratoryRecordsModule } from './laboratory-records/laboratory-records.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(process.env.MONGODB),
    MailerModule.forRoot({
      transport: {
        host: process.env.HOSTSMTP,
        port: process.env.PORTSMTP,
        secure: false,
        auth: {
          user: process.env.USERSMTP,
          pass: process.env.PASSWORDSMTP,
        },
      },
    }),
    GoogleRecaptchaModule.forRoot({
      secretKey: process.env.RECAPTCHA,
      response: (req) => req.headers['recaptcha-response-header'],
      score: 0.5,
    }),
    QuotationModule,
    SolutionsModule,
    CommonModule,
    SeedModule,
    AuthModule,
    LaboratoryRecordsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
