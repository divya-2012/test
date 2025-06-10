import prisma from '../utils/prisma';
import { NotFoundError } from '../utils/HttpError';
import { CreateUserInput, UpdateUserInput } from '../schemas/user.schema';

export class UserRepository {
  async findAll() {
    return prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: CreateUserInput) {
    if (!data.email) {
      throw new Error('email is required to create a user');
    }
    // Ensure required fields are present for Prisma
    const { email, name } = data;
    return prisma.user.create({
      data: {
        email,
        name,
      },
    });
  }

  async update(id: number, data: UpdateUserInput) {
    try {
      return await prisma.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'code' in error && (error as any).code === 'P2025') {
        throw new NotFoundError(`User with id ${id} not found`);
      }
      throw error;
    }
  }

  async delete(id: number) {
    try {
      return await prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'code' in error && (error as any).code === 'P2025') {
        throw new NotFoundError(`User with id ${id} not found`);
      }
      throw error;
    }
  }
}

export const userRepository = new UserRepository();
