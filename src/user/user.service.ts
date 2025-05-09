import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { log } from 'console';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
  async create(createUserDto: CreateUserDto) {
    const { username, password, email } = createUserDto;
    log('createUserDto', createUserDto);
    const isExist = await this.findByUsername(username);
    if (isExist) {
      throw new Error('User already exists...');
    }
    const isEmailExist = await this.findByEmail(email);
    if (isEmailExist) {
      throw new Error('Email already exists...');
    }
    const user = this.userRepository.create({
      username,
      password,
      email,
    });
    return this.userRepository.save(user);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
