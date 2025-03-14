import { z } from 'zod';

const userSchema = z.object({
  firstname: z.string().min(1, 'First name is required'),
  lastname: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  role: z.enum(['Administrator', 'Student', 'Dozent'], {
    errorMap: () => ({ message: 'Invalid role' })
  })
});

export const validateUserInput = (userData) => {
  try {
    const validatedData = userSchema.parse(userData);
    return { isValid: true, data: validatedData };
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof z.ZodError 
        ? error.errors[0].message 
        : 'Invalid input data'
    };
  }
}; 