import {
  IsEmail,
  IsString,
  Matches,
  MinLength,
  IsOptional,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    message:
      'Password must contain at least one lowercase, one uppercase, one number, and one special character',
  })
  password: string;

  @IsString()
  @IsOptional()
  recaptchaToken: string;
}
