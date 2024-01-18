import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { QuotationModule } from './quotation/quotation.module';
import { SolutionsModule } from './solutions/solutions.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot('mongodb://localhost:27018/sici'),
    QuotationModule,
    SolutionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
