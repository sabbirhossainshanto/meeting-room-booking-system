import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TBooking } from './booking.interface';
import { Room } from '../room/room.model';
import { Slot } from '../slot/slot.model';
import { Booking } from './booking.model';
import mongoose from 'mongoose';
import { initiatePayment } from '../payment/payment.utils';

const createBookingIntoDB = async (payload: TBooking) => {
  const isUserExist = await User.findById(payload.user);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }
  const isRoomExist = await Room.findById(payload.room);
  if (!isRoomExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room is not found');
  }
  if (isRoomExist.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room is already deleted');
  }
  const isAllSlotsAvailable = await Slot.find({
    _id: { $in: payload.slots },
    date: payload.date,
    isBooked: false,
  });

  if (isAllSlotsAvailable?.length !== payload.slots?.length) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Some slots are not exist or already booked ! Check the slots and date property',
    );
  }
  const pricePerSlot = isRoomExist.pricePerSlot * isAllSlotsAvailable.length;

  const transactionId = `TXN-${Date.now()}`;

  const paymentData = {
    transactionId,
    amount: Number(pricePerSlot),
    customerName: isUserExist.name,
    customerAddress: isUserExist.address,
    customerEmail: isUserExist.email,
    customerPhone: isUserExist.phone,
  };
  payload.totalAmount = pricePerSlot;
  payload.transactionId = transactionId;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await Slot.updateMany(
      {
        _id: { $in: payload.slots },
        date: payload.date,
      },
      { $set: { isBooked: true } },
      { session },
    );

    await Booking.create([payload], { session });
    await session.commitTransaction();
    await session.endSession();
  } catch (error: unknown) {
    await session.abortTransaction();
    await session.endSession();
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
  const paymentSession = await initiatePayment(paymentData);
  return paymentSession;
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find({ isPaid: true })
    .populate('user')
    .populate('slots')
    .populate('room');
  if (result?.length > 0) {
    return result;
  } else {
    throw new AppError(httpStatus.NOT_FOUND, 'No data found!');
  }
};

const getMyBookingsFromDB = async (email: string) => {
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }
  const user = isUserExist?._id;
  const result = await Booking.find({ user, isPaid: true })
    .populate('user')
    .populate('slots')
    .populate('room');
  if (result?.length > 0) {
    return result;
  } else {
    throw new AppError(httpStatus.NOT_FOUND, 'No data found!');
  }
};

const updateBookingIntoDB = async (id: string, payload: Partial<TBooking>) => {
  const isBookingExist = await Booking.findById(id);
  if (!isBookingExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking is not found');
  }

  if (payload.user) {
    const isUserExist = await User.findById(payload.user);
    if (!isUserExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
    }
  }

  if (payload.room) {
    const isRoomExist = await Room.findById(payload.room);
    if (!isRoomExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'Room is not found');
    }
  }
  if (payload.slots) {
    const isAllSlotsAvailable = await Slot.find({
      _id: { $in: payload.slots },
    });

    if (isAllSlotsAvailable?.length !== payload.slots?.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Some slots are not exist');
    }
  }

  const result = await Booking.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteBookingIntoDB = async (id: string) => {
  const isBookingExist = await Booking.findById(id);
  if (!isBookingExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking is not found');
  }

  if (isBookingExist.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Booking is already deleted');
  }

  const result = await Booking.findByIdAndDelete(id);
  return result;
};

export const bookingService = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getMyBookingsFromDB,
  updateBookingIntoDB,
  deleteBookingIntoDB,
};
