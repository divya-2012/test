import { z } from 'zod';

// Base schema for user fields
export const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
});

// Schema for creating a new user
export const createUserSchema = userSchema;
export type CreateUserInput = z.infer<typeof createUserSchema>;

// Schema for updating a user - all fields optional
export const updateUserSchema = userSchema.partial();
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

// Schema for user response (with id)
export const userResponseSchema = userSchema.extend({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type UserResponse = z.infer<typeof userResponseSchema>;
