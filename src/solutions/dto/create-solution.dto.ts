import { IsString, IsEnum, IsInt, IsNumber, Min } from 'class-validator';
import { SolutionType } from '../../const/const';

export class CreateSolutionDto {
  @IsEnum(SolutionType)
  type: string;

  @IsString()
  scope: string;

  @IsString()
  notes: string;

  @IsInt()
  @Min(1)
  order: number;

  @IsNumber()
  @Min(1)
  hoursEquipment: number;

  @IsNumber()
  @Min(1)
  totalHours: number;

  @IsNumber()
  unitValue: number;
}
