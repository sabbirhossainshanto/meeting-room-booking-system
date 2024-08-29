import { Router } from 'express';
import { userRoutes } from '../modules/user/user.route';
import { roomRoutes } from '../modules/room/room.route';
import { slotRoutes } from '../modules/slot/slot.route';
import { bookingRoutes } from '../modules/booking/booking.route';
import { myBookingRoutes } from '../modules/booking/myBookings.route';
import { usersRoutes } from '../modules/user/users.route';
import { paymentRoute } from '../modules/payment/payment.route';
const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: userRoutes,
  },
  {
    path: '/rooms',
    route: roomRoutes,
  },
  {
    path: '/slots',
    route: slotRoutes,
  },
  {
    path: '/bookings',
    route: bookingRoutes,
  },
  {
    path: '/my-bookings',
    route: myBookingRoutes,
  },
  {
    path: '/users',
    route: usersRoutes,
  },
  {
    path: '/success',
    route: paymentRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
