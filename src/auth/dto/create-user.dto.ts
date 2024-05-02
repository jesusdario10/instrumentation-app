import {
  IsString,
  IsEmail,
  IsArray,
  IsOptional,
  IsBoolean,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(6)
  nit: string;

  @IsString()
  companyName: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @MinLength(6)
  phoneNumber: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    message:
      'Password must contain at least one lowercase, one uppercase, one number, and one special character',
  })
  password: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsArray()
  @IsOptional()
  roles: string[];
}
