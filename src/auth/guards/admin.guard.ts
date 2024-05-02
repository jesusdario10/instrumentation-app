import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { CONTROL_USER } from 'src/common/const/const';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

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

      const user = await this.authService.findById(payload.id);

      if (!user) {
        throw new UnauthorizedException('Resource not found');
      }

      const isAdmin = user.roles.includes(CONTROL_USER);

      if (!isAdmin) {
        throw new UnauthorizedException('resource not found');
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
