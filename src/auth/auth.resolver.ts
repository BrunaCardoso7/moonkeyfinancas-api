import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateAuthInput } from './dto/create-auth.input';
import { AuthResponse } from './dto/create-auth-response';

@Resolver(() => AuthResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, {name: "loginUser", description: "login de usuário retorna o token de acesso"})
  signAuth(@Args('createAuthInput') createAuthInput: CreateAuthInput) {
    return this.authService.SignIn(createAuthInput);
  }
}
 