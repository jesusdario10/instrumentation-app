import { PartialType } from '@nestjs/mapped-types';
import { CreateLaboratoryRecordDto } from './create-laboratory-record.dto';

export class UpdateLaboratoryRecordDto extends PartialType(
  CreateLaboratoryRecordDto,
) {}
