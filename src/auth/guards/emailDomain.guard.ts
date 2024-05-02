import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { DOMAINS_NOT_ALLOWED } from '../../common/const/const';

@Injectable()
export class EmailDomainGuard implements CanActivate {
  private forbiddenKeywords: string[] = [...DOMAINS_NOT_ALLOWED];

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const userEmail = request.body.email;

    if (!userEmail) {
      throw new BadRequestException('Email must be provided');
    }

    const domain = userEmail.split('@')[1];
    if (!domain) {
      throw new BadRequestException('Invalid email format');
    }

    const isForbidden = this.forbiddenKeywords.some((keyword) =>
      domain.includes(keyword),
    );
    if (isForbidden) {
      throw new BadRequestException(
        'Registration with this email domain is not allowed',
      );
    }

    return true;
  }
}
