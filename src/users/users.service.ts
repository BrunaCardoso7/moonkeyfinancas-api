import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createUserInput: CreateUserInput) {
    const hashPass = await bcrypt.hash(createUserInput.password, 10)
    const user = this.userRepository.create( {
      ...createUserInput,
      password: hashPass
    })

    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({where: { id }});
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({where: { email }});
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const user = await this.userRepository.preload({
      id,
      ...updateUserInput,
    });
    
    if(updateUserInput.password) {
      const hashPass = await bcrypt.hash(updateUserInput.password, 10)
      updateUserInput.password = hashPass
    }

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return await this.userRepository.save(user);;
  }

  async validateUserPassWord (user: User, password: string) {

    return await bcrypt.compare(password, user.password)
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}
