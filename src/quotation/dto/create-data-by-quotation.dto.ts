import { IsString, IsEmail, IsArray, ValidateNested } from 'class-validator';
import { ServiceItemDto } from './service-item-dto';
import { Type } from 'class-transformer';

export class CreateDataByQuotationDto {
  @IsString()
  type: string;

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
  @Type(() => ServiceItemDto)
  services: ServiceItemDto[];
}
