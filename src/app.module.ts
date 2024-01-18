import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { QuotationModule } from './quotation/quotation.module';
import { SolutionsModule } from './solutions/solutions.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    QuotationModule,
    SolutionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
