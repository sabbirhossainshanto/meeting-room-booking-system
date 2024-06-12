import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import auth from '../../middlewares/auth';
import { bookingValidation } from './booking.validation';
import { bookingController } from './booking.controller';

const router = express.Router();
router.post(
  '/',
  auth('user'),
  validateRequest(bookingValidation.createBookingValidationSchema),
  bookingController.createBooking,
);
router.get('/', auth('admin'), bookingController.getAllBookings);
router.get('/my-bookings/:id', auth('admin'), bookingController.getAllBookings);

export const bookingRoutes = router;
