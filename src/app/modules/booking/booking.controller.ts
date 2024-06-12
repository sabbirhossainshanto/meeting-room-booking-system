import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { bookingService } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const result = await bookingService.createBookingIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking is created successfully',
    data: result,
  });
});
const getAllBookings = catchAsync(async (req, res) => {
  const result = await bookingService.getAllBookingsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking are retrieved successfully',
    data: result,
  });
});
const getMyBookings = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await bookingService.getMyBookingsFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking are retrieved successfully',
    data: result,
  });
});
const updateBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await bookingService.updateBookingIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking is updated successfully',
    data: result,
  });
});

export const bookingController = {
  createBooking,
  getAllBookings,
  getMyBookings,
  updateBooking,
};
