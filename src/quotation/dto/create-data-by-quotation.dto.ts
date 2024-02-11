import {
  IsString,
  IsNumber,
  IsEmail,
  IsArray,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { ServiceItemDto } from './service-item-dto';
import { Type } from 'class-transformer';
import { SolutionType } from '../../const/const';

export class CreateDataByQuotationDto {
  @IsEnum(SolutionType)
  type: string;

  @IsNumber()
  nit: number;

  @IsString()
  legalName: string;

  @IsString()
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceItemDto)
  services: ServiceItemDto[];
}
