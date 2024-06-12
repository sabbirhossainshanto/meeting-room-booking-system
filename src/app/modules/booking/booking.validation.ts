import { z } from 'zod';

const createBookingValidationSchema = z.object({
  body: z.object({
    room: z.string({
      required_error: 'room is required!',
      message: 'room should be in string!',
    }),
    user: z.string({
      required_error: 'user is required!',
      message: 'user should be in string!',
    }),
    date: z.string({
      required_error: 'date is required!',
      message: 'date should be in string!',
    }),

    slots: z.array(
      z.string({
        required_error: 'slots is required!',
        message: 'slots should be in string!',
      }),
    ),

    isDeleted: z
      .boolean({
        required_error: 'isDeleted  is required!',
        message: 'isDeleted  should be in boolean!',
      })
      .default(false)
      .optional(),
  }),
});

export const bookingValidation = {
  createBookingValidationSchema,
};
