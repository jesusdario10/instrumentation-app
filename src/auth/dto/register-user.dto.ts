import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { Exclude } from 'class-transformer';
import { AreSame } from '../../common/decorators/are-same.decorator'; // Ajusta esta ruta según tu estructura de directorios

export class RegisterUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @MinLength(8)
  @IsOptional()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    message:
      'Password must contain at least one lowercase, one uppercase, one number, and one special character',
  })
  @AreSame('password', {
    message: 'your new password does not match, please verify',
  })
  confirmPassword: string;

  @IsOptional()
  @IsString()
  recaptchaToken?: string;

  @Exclude()
  roles: string[];
}
