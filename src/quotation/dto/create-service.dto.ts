import { IsNumber, IsString, Min } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  type: string;

  @IsString()
  scope: string;

  @IsString()
  notes: string;

  @IsNumber()
  @Min(1)
  units: number;

  @IsNumber()
  @Min(1)
  price: number;

  @IsNumber()
  @Min(1)
  hours: number;
}
