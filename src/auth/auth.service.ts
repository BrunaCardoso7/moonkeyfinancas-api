import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthInput } from './dto/create-auth.input';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor (
    private usersService: UsersService,
    private jwtService: JwtService  
  ) {}

  async SignIn(createAuthInput: CreateAuthInput) {
    const foundUser =  await this.usersService.findOneByEmail(createAuthInput.email);

    const verifyLogin =  await this.usersService.validateUserPassWord(foundUser, createAuthInput.password)

    console.log(foundUser)
    console.log(verifyLogin)

    if (!verifyLogin ) {
      throw new UnauthorizedException();
    }

    const payload = { id: foundUser.id }
    const acess_Token = await this.jwtService.signAsync(payload)
    return {
      user: foundUser,
      acess_Token,
    };
  }

  SignOut() {
    return `This action returns all auth`;
  }

}
