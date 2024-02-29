import { IsString, IsInt, IsNumber, Min } from 'class-validator';

export class CreateSolutionDto {
  @IsString()
  type: string;

  @IsString()
  scope: string;

  @IsString()
  notes: string;

  @IsString()
  kind: string;

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
