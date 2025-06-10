import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { 
  createProductSchema, 
  updateProductSchema, 
  productIdSchema
} from '../schemas/product.schema';
import { productService } from '../services/productService';

export const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await productService.getAllProducts();
  res.status(200).json({
    success: true,
    data: products,
  });
});

export const getProductByUserId = asyncHandler(async (req: Request, res: Response) => {
  const { id } = productIdSchema.parse({ id: req.params.id });
  const result = await productService.getProductByUserId(id);
  
  if (!result.success) {
    return res.status(result.statusCode || 500).json({
      success: false,
      message: result.message
    });
  }
  
  res.status(200).json({
    success: true,
    data: result.data,
  });
});

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = productIdSchema.parse({ id: req.params.id });
  const result = await productService.getProductById(id);
  
  if (!result.success) {
    return res.status(result.statusCode || 500).json({
      success: false,
      message: result.message
    });
  }
  
  res.status(200).json({
    success: true,
    data: result.data,
  });
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const data = createProductSchema.parse(req.body);
  const result = await productService.createProduct(data);
  
  if (!result.success) {
    return res.status(result.statusCode || 500).json({
      success: false,
      message: result.message
    });
  }
  
  res.status(201).json({
    success: true,
    data: result.data,
  });
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = productIdSchema.parse({ id: req.params.id });
  const data = updateProductSchema.parse(req.body);
  
  const result = await productService.updateProduct(id, data);
  
  if (!result.success) {
    return res.status(result.statusCode || 500).json({
      success: false,
      message: result.message
    });
  }
  
  res.status(200).json({
    success: true,
    data: result.data,
  });
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = productIdSchema.parse({ id: req.params.id });
  
  const result = await productService.deleteProduct(id);
  
  if (!result.success) {
    return res.status(result.statusCode || 500).json({
      success: false,
      message: result.message
    });
  }
  
  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
    data: result.data,
  });
});
