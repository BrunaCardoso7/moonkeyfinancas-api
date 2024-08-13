import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';


@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret', 
      signOptions: { expiresIn: '60s' },
    }),

  ],
  providers: [AuthResolver, AuthService, AuthGuard],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
