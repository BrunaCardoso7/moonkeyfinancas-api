import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateAuthInput } from './dto/create-auth.input';
import { AuthResponse } from './dto/create-auth-response';
import { User } from 'src/users/entities/user.entity';

@Resolver(() => AuthResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  signAuth(@Args('createAuthInput') createAuthInput: CreateAuthInput) {
    return this.authService.SignIn(createAuthInput);
  }
}
 