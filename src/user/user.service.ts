import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      return this.userRepository.save(createUserDto);
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('falha ao criar usuário');
    }
  }
  async findAll() {
    try {
      return this.userRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Nenhum usuário encontrado');
    }
  }
  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`usuario com id ${id} não encontrado`);
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException('falha ao pesquisar usuário');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      await this.userRepository.update(id, updateUserDto);
      return await this.userRepository.findOne({ where: { id } });
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Falha ao atualizar usuário');
    }
  }

  async remove(id: string) {
    try {
      const result = await this.userRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Usuario com o id ${id} não foi encontrado`);
      }
    } catch (error) {
      console.log(error)
      throw error instanceof NotFoundException ? error : new InternalServerErrorException('Falha ao deletar usuário');
    }
  }
}
