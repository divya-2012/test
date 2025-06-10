import { userRepository } from '../repositories/userRepository';
import { CreateUserInput, UpdateUserInput } from '../schemas/user.schema';
import { ConflictError } from '../utils/HttpError';

export class UserService {
  async getAllUsers() {
    return userRepository.findAll();
  }

  async getUserById(id: number) {
    return userRepository.findById(id);
  }

  async createUser(data: CreateUserInput) {
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictError('Email already in use');
    }

    return userRepository.create(data);
  }

  async updateUser(id: number, data: UpdateUserInput) {
    if (data.email) {
      const existingUser = await userRepository.findByEmail(data.email);
      if (existingUser && existingUser.id !== id) {
        throw new ConflictError('Email already in use');
      }
    }

    return userRepository.update(id, data);
  }

  async deleteUser(id: number) {
    return userRepository.delete(id);
  }
}

export const userService = new UserService();
