import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt.payload';
import { AuthService } from '../auth.service';
import { extractTokenFromHeader } from '../../common/helpers';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: process.env.SEED,
      });

      const user = await this.authService.findById(payload.id);
      if (!user) throw new UnauthorizedException();
      if (!user.isActive) throw new UnauthorizedException();

      request['user'] = user;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return Promise.resolve(true);
  }
}
