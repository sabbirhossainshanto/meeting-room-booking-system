import { z } from 'zod';

const createSlotValidationSchema = z.object({
  body: z.object({
    room: z.string({
      required_error: 'Room is required!',
      message: 'Room should be in string!',
    }),
    date: z.string({
      required_error: 'Date is required!',
      message: 'Date should be in string!',
    }),
    isBooked: z
      .boolean({
        required_error: 'isBooked is required!',
        message: 'isBooked should be in boolean!',
      })
      .default(false),
    startTime: z.string({
      required_error: 'startTime is required!',
      message: 'startTime should be in string!',
    }),
    endTime: z.string({
      required_error: 'endTime is required!',
      message: 'endTime should be in string!',
    }),
  }),
});

const updateSlotValidationSchema = z.object({
  body: z.object({
    room: z
      .string({
        message: 'Room should be in string!',
      })
      .optional(),
    date: z
      .string({
        message: 'Date should be in string!',
      })
      .optional(),
    isBooked: z
      .boolean({
        message: 'isBooked should be in boolean!',
      })
      .optional()
      .default(false),
    startTime: z
      .string({
        message: 'startTime should be in string!',
      })
      .optional(),
    endTime: z
      .string({
        message: 'endTime should be in string!',
      })
      .optional(),
  }),
});

export const slotValidation = {
  createSlotValidationSchema,
  updateSlotValidationSchema
};
