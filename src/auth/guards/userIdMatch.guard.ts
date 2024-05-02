import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { extractTokenFromHeader } from '../../common/helpers';

@Injectable()
export class UserIdMatchGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    const userIdToMatch = request.params.id;

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SEED,
      });

      if (!payload || !payload.id) {
        throw new UnauthorizedException('Invalid token payload');
      }

      if (payload.id !== userIdToMatch) {
        throw new UnauthorizedException('Invalid token payload');
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
