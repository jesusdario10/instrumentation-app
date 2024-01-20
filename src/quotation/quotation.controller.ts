import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuotationService } from './quotation.service';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';

@Controller('quotation')
export class QuotationController {
  constructor(private readonly quotationService: QuotationService) {}

  @Post()
  create(@Body() createQuotationDto: CreateQuotationDto) {
    return this.quotationService.create(createQuotationDto);
  }

  @Get(':consecutive')
  findOne(@Param('consecutive') consecutive: string) {
    return this.quotationService.findOne(consecutive);
  }

  @Patch(':consecutive')
  update(
    @Param('consecutive') consecutive: string,
    @Body() updateQuotationDto: UpdateQuotationDto,
  ) {
    return this.quotationService.update(consecutive, updateQuotationDto);
  }

  @Delete(':consecutive')
  remove(@Param('consecutive') consecutive: string) {
    return this.quotationService.remove(consecutive);
  }
}
