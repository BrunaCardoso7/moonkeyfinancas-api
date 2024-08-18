  import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';

  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const ctx = context.getArgByIndex(2); 
      const request = ctx?.req; 
      const token = this.extractTokenFromHeader(request);

      if (!token) {
        console.log(token)
        throw new UnauthorizedException();
      }

      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: 'defaultSecret',
        });
        request.user = { id: payload.id }
      } catch {
        throw new UnauthorizedException();
      }

      return true;
    }

    private extractTokenFromHeader(request: any): string | undefined {
      const authorization = request?.headers?.authorization;
      const [type, token] = authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
