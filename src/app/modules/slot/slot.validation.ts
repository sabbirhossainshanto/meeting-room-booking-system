import { z } from 'zod';

const createSlotValidationSchema = z.object({
  body: z.object({
    room: z.string({
      required_error: 'Room should be in string!',
      message: 'Room is required!',
    }),
    date: z.string({
      required_error: 'Date should be in string!',
      message: 'Date is required!',
    }),
    isBooked: z
      .boolean({
        required_error: 'isBooked should be in boolean!',
        message: 'isBooked is required!',
      })
      .default(false),
    startTime: z.string({
      required_error: 'startTime should be in number!',
      message: 'startTime is required!',
    }),
    endTime: z.string({
      required_error: 'endTime should be in number!',
      message: 'endTime is required!',
    }),
  }),
});

export const slotValidation = {
  createSlotValidationSchema,
};
