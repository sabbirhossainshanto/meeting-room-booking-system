import express from 'express';
import auth from '../../middlewares/auth';
import { bookingController } from './booking.controller';

const router = express.Router();

router.get('/', auth('user'), bookingController.getMyBookings);

export const myBookingRoutes = router;
