import { IsString, IsNumber, Min } from 'class-validator';

export class ServiceItemDto {
  @IsString()
  _id: string;

  @IsNumber()
  @Min(1, { message: 'inputValue debe ser al menos 1' })
  inputValue: number;
}
