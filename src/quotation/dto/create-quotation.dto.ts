import {
  IsString,
  IsEmail,
  IsEnum,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { QuotationStatus } from '../entities/quotation.entity';
import { Type } from 'class-transformer';
import { CreateServiceDto } from './create-service.dto';

export class CreateQuotationDto {
  @IsString()
  nit: string;

  @IsString()
  legalName: string;

  @IsString()
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateServiceDto)
  services: CreateServiceDto[];

  @IsEnum(QuotationStatus)
  status: QuotationStatus;
}
