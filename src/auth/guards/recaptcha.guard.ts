import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service'; // Asegúrate de tener AuthService con la función validateRecaptcha

@Injectable()
export class RecaptchaGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const recaptchaToken = request.body.recaptchaToken;

    console.log(recaptchaToken);

    const skipRecaptcha = this.configService.get<boolean>('SKIP_RECAPTCHA');
    if (skipRecaptcha) {
      return true;
    }

    if (!recaptchaToken) {
      throw new BadRequestException('Recaptcha token is missing');
    }

    const isCaptchaValid =
      await this.authService.validateRecaptcha(recaptchaToken);
    if (!isCaptchaValid) {
      throw new BadRequestException('Invalid Recaptcha');
    }

    return true;
  }
}
