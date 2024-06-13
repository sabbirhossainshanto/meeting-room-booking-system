import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TBooking } from './booking.interface';
import { Room } from '../room/room.model';
import { Slot } from '../slot/slot.model';
import { Booking } from './booking.model';

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
  });

  if (isAllSlotsAvailable?.length !== payload.slots?.length) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Some slots are not exist,Check the slots and date property',
    );
  }

  const pricePerSlot = isRoomExist.pricePerSlot * isAllSlotsAvailable.length;
  payload.totalAmount = pricePerSlot;

  const result = await Booking.create(payload);
  return result;
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find()
    .populate('user')
    .populate('slots')
    .populate('room');
  return result;
};

const getMyBookingsFromDB = async (id: string) => {
  const isUserExist = await User.findById(id);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is bot found');
  }
  const result = await Booking.find({ user: id })
    .populate('user')
    .populate('slots')
    .populate('room');
  return result;
};

const updateBookingIntoDB = async (id: string, payload: Partial<TBooking>) => {
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

  const result = await Booking.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const bookingService = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getMyBookingsFromDB,
  updateBookingIntoDB,
  deleteBookingIntoDB,
};
