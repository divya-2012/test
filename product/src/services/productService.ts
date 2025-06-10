import { PrismaClient } from '@prisma/client';
import { ProductRepository } from '../repositories/productRepository';
import { CreateProductInput, UpdateProductInput } from '../schemas/product.schema';

const prisma = new PrismaClient();
const repository = new ProductRepository();

export class ProductService {
  async getAllProducts() {
    try {
      const products = await repository.findAll();
      return {
        success: true,
        data: products,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to fetch products',
        statusCode: 500,
      };
    }
  }

  async getProductById(id: number) {
    try {
      const product = await repository.findById(id);
      if (!product) {
        return {
          success: false,
          message: 'Product not found',
          statusCode: 404,
        };
      }
      return {
        success: true,
        data: product,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to fetch product',
        statusCode: 500,
      };
    }
  }

  async getProductByUserId(id: number) {
    try {
      const products = await repository.findByUserId(id);
      if (!products || products.length === 0) {
        return {
          success: false,
          message: 'No products found for this user',
          statusCode: 404,
        };
      }
      return {
        success: true,
        data: products,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to fetch user products',
        statusCode: 500,
      };
    }
  }

  async createProduct(data: CreateProductInput) {
    try {
      // Validate that the user exists before creating the product
      const userExists = await prisma.user.findUnique({
        where: { id: data.userId }
      });
      
      if (!userExists) {
        return {
          success: false,
          message: 'User does not exist. Cannot create product with non-existent user ID',
          statusCode: 409,
        };
      }

      const product = await repository.create(data);
      return {
        success: true,
        data: product,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to create product',
        statusCode: 500,
      };
    }
  }

  async updateProduct(id: number, data: UpdateProductInput) {
    try {
      // Check if product exists
      const existingProduct = await repository.findById(id);
      if (!existingProduct) {
        return {
          success: false,
          message: 'Product not found',
          statusCode: 404,
        };
      }

      // If userId is being updated, validate that the user exists
      if (data.userId) {
        const userExists = await prisma.user.findUnique({
          where: { id: data.userId }
        });
        
        if (!userExists) {
          return {
            success: false,
            message: 'User does not exist. Cannot update product with non-existent user ID',
            statusCode: 409,
          };
        }
      }

      const updatedProduct = await repository.update(id, data);
      return {
        success: true,
        data: updatedProduct,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to update product',
        statusCode: 500,
      };
    }
  }

  async deleteProduct(id: number) {
    try {
      const existingProduct = await repository.findById(id);
      if (!existingProduct) {
        return {
          success: false,
          message: 'Product not found',
          statusCode: 404,
        };
      }
      
      const deletedProduct = await repository.delete(id);
      return {
        success: true,
        data: deletedProduct,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to delete product',
        statusCode: 500,
      };
    }
  }
}

export const productService = new ProductService();
