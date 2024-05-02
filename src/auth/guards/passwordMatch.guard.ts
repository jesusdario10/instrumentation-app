import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class PasswordMatchGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { password, confirmPassword } = request.body;

    if (!password || !confirmPassword) {
      throw new BadRequestException(
        'Both password and confirmPassword are required',
      );
    }

    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    return true;
  }
}
