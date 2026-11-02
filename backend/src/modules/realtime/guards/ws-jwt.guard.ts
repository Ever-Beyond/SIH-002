import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WsJwtGuard implements CanActivate {
  private readonly logger = new Logger(WsJwtGuard.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();
    
    // We check both auth.token and headers.authorization to be safe
    let token = client.handshake?.auth?.token;
    if (!token && client.handshake?.headers?.authorization) {
      token = client.handshake.headers.authorization.split(' ')[1];
    }

    if (!token) {
      this.logger.warn('WebSocket connection attempt missing token');
      throw new UnauthorizedException('Missing authentication token');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      // Attach the user payload to the socket client for downstream room authorization
      client.user = {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
      };
      return true;
    } catch {
      this.logger.warn('WebSocket connection attempt with invalid token');
      throw new UnauthorizedException('Invalid or expired authentication token');
    }
  }
}
