import { IsEnum, IsNumber, IsString, Min } from 'class-validator';
import { SolutionType } from '../../const/const';

export class CreateServiceDto {
  @IsEnum(SolutionType)
  type: SolutionType;

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
