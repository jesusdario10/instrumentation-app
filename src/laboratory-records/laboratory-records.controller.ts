import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { LaboratoryRecordsService } from './laboratory-records.service';
import { CreateLaboratoryRecordDto } from './dto/create-laboratory-record.dto';
import { UpdateLaboratoryRecordDto } from './dto/update-laboratory-record.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('laboratory-records')
export class LaboratoryRecordsController {
  constructor(
    private readonly laboratoryRecordsService: LaboratoryRecordsService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createLaboratoryRecordDto: CreateLaboratoryRecordDto) {
    return this.laboratoryRecordsService.create(createLaboratoryRecordDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSolutionDto: UpdateLaboratoryRecordDto,
  ) {
    return this.laboratoryRecordsService.update(id, updateSolutionDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.laboratoryRecordsService.remove(id);
  }

  @Get('types')
  async distinctTypes() {
    return await this.laboratoryRecordsService.getDistinctTypes();
  }
  @Get('types/:type')
  async getRecordsByType(@Param('type') type: string) {
    return await this.laboratoryRecordsService.getRecordsByType(type);
  }

  @Get(':id')
  byId(@Param('id') id: string) {
    return this.laboratoryRecordsService.byId(id);
  }
}
