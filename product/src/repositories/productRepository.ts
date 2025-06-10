import { PrismaClient, Product } from '@prisma/client';
import { CreateProductInput, UpdateProductInput } from '../schemas/product.schema';

const prisma = new PrismaClient();

export class ProductRepository {
  async findAll(): Promise<Product[]> {
    return prisma.product.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findById(id: number): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findByUserId(id: number): Promise<Product[] | null> {
    return prisma.product.findMany({
      where: { userId: id },
    });
  }

  async create(data: CreateProductInput): Promise<Product> {
    return prisma.product.create({
      data
    });
  }

  async update(id: number, data: UpdateProductInput): Promise<Product | null> {
    return prisma.product.update({
      where: { id },
      data,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async delete(id: number): Promise<Product | null> {
    return prisma.product.delete({
      where: { id },
    });
  }
}
