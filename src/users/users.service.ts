import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  create(createUserInput: CreateUserInput) {
    return this.userRepository.save(createUserInput);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOne({where: { id }});
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({where: { email }});
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const user = await this.userRepository.preload({
      id,
      ...updateUserInput,
    });

    if (!user) {
      throw new Error('User not found');
    }

    return this.userRepository.save(user);;
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}
