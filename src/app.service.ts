import { HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './services/database/repositories/user.repository';
import { User } from './services/database/types/user.type';

@Injectable()
export class AppService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUsers(): Promise<object> {
    const response = await this.userRepository.findAll();

    return {
      status: HttpStatus.OK,
      data: response,
    };
  }

  async findUser(user: User): Promise<object> {
    const response = await this.userRepository.findByIdAndEmail(user);

    return {
      status: HttpStatus.OK,
      data: response,
    };
  }

  async createUser(user: User): Promise<object> {
    const response = await this.userRepository.save(user);

    return {
      status: HttpStatus.CREATED,
      message: response,
    };
  }

  async updateUser(user: User): Promise<object> {
    const response = await this.userRepository.update(user);

    return {
      status: HttpStatus.OK,
      message: response,
    };
  }

  async deleteUser(user: User): Promise<object> {
    const response = await this.userRepository.delete(user);

    return {
      status: HttpStatus.OK,
      message: response,
    };
  }
}
