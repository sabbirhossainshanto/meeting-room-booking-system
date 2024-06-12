import { z } from 'zod';

const createRoomValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required!',
      message: 'Name should be in string!',
    }),
    amenities: z.array(
      z.string({
        required_error: 'Amenities is required!',
        message: 'Amenities should be in string!',
      }),
    ),
    capacity: z.number({
      required_error: 'Capacity is required!',
      message: 'Capacity should be in number!',
    }),
    floorNo: z.number({
      required_error: 'Floor no is required!',
      message: 'Floor no should be in number!',
    }),
    pricePerSlot: z.number({
      required_error: 'Price per slot no is required!',
      message: 'Price per slot no should be in number!',
    }),
    roomNo: z.number({
      required_error: 'Room no is required!',
      message: 'Room no should be in number!',
    }),
    isDeleted: z
      .boolean({
        required_error: 'isDeleted no is required!',
        message: 'isDeleted no should be in boolean!',
      })
      .default(false)
      .optional(),
  }),
});
const updateRoomValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required!',
        message: 'Name should be in string!',
      })
      .optional(),
    amenities: z.array(
      z
        .string({
          required_error: 'Amenities is required!',
          message: 'Amenities should be in string!',
        })
        .optional(),
    ),
    capacity: z
      .number({
        required_error: 'Capacity is required!',
        message: 'Capacity should be in number!',
      })
      .optional(),
    floorNo: z
      .number({
        required_error: 'Floor no is required!',
        message: 'Floor no should be in number!',
      })
      .optional(),
    pricePerSlot: z
      .number({
        required_error: 'Price per slot no is required!',
        message: 'Price per slot no should be in number!',
      })
      .optional(),
    roomNo: z
      .number({
        required_error: 'Room no is required!',
        message: 'Room no should be in number!',
      })
      .optional(),
    isDeleted: z
      .boolean({
        required_error: 'isDeleted no is required!',
        message: 'isDeleted no should be in boolean!',
      })
      .optional(),
  }),
});

export const roomValidation = {
  createRoomValidationSchema,
  updateRoomValidationSchema,
};
