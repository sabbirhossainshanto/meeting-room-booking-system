import { z } from 'zod';

const signupUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required!',
      message: 'Name should be in string!',
    }),
    email: z
      .string({
        required_error: 'Email is required!',
        message: 'Email should be in string!',
      })
      .email(),
    password: z.string({
      required_error: 'Password is required!',
      message: 'Password should be in string!',
    }),
    confirmPassword: z.string({
      required_error: 'Confirm password is required!',
      message: 'Confirm password should be in string!',
    }),
    phone: z.string({
      required_error: 'phone number is required!',
      message: 'phone number should be in string!',
    }),
    address: z.string({
      required_error: 'Address is required!',
      message: 'Address should be in string!',
    }),
    role: z.enum(['admin', 'user']),
  }),
});

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email should be in string!',
        message: 'Email is required!',
      })
      .email(),
    password: z.string({
      required_error: 'Password should be in string!',
      message: 'Password is required!',
    }),
  }),
});

const userRoleUpdateValidationSchema = z.object({
  body: z.object({
    role: z.enum(['user', 'admin']),
  }),
});

export const userValidation = {
  signupUserValidationSchema,
  loginUserValidationSchema,
  userRoleUpdateValidationSchema,
};
