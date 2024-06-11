import { z } from 'zod';

const signupUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name should be in string!',
      message: 'Name is required!',
    }),
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
    phone: z
      .number({
        required_error: 'Password should be in number!',
        message: 'Number is required!',
      })
      .max(11, { message: 'Number cant be greater that eleven character' })
      .min(11, { message: 'Number cant be less that eleven character' }),
    address: z.string({
      required_error: 'Address should be in string!',
      message: 'Address is required!',
    }),
    role: z.enum(['admin', 'user']),
  }),
});

export const userValidation = {
  signupUserValidationSchema,
};
