import { IsString, IsInt, IsNumber, Min } from 'class-validator';

export class CreateLaboratoryRecordDto {
  @IsString()
  type: string;

  @IsString()
  scope: string;

  @IsInt()
  @Min(1)
  order: number;

  @IsNumber()
  @Min(1)
  totalHours: number;

  @IsNumber()
  unitValue: number;
}
