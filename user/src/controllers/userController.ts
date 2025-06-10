import { Request, Response } from 'express';
import { userService } from '../services/userService';
import { asyncHandler } from '../utils/asyncHandler';
import { createUserSchema, updateUserSchema } from '../schemas/user.schema';

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.status(200).json({
    success: true,
    data: users,
  });
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = await userService.getUserById(id);
  res.status(200).json({
    success: true,
    data: user,
  });
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const userData = createUserSchema.parse(req.body);
  const user = await userService.createUser(userData);
  res.status(201).json({
    success: true,
    data: user,
  });
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const updateData = updateUserSchema.parse(req.body);
  const user = await userService.updateUser(id, updateData);
  res.status(200).json({
    success: true,
    data: user,
  });
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = await userService.deleteUser(id);
  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
    data: user,
  });
});

export const getUserProducts = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  type ProductResponse = {
    success: boolean;
    data: { data: any[] };
    message?: string;
  };
  const response: ProductResponse = await fetch(`${process.env.PRODUCT_SERVICE_URL}/product/user/${id}`)
    .then(response => response.json() as Promise<ProductResponse>);

  if (!response || !response.success) {
    return res.status(404).json({
      success: false,
      message: 'User not found or no products available',
    });
  }
  
  // Extract the products array directly from the nested response
  const products = response.data;
  
  res.status(200).json({
    success: true,
    data: products,
  });
});
