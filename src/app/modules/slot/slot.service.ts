import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Room } from '../room/room.model';
import { TSlot } from './slot.interface';
import { Slot } from './slot.model';
import { generateTimeSlots } from './slot.utils';

const createSlotIntoDB = async (payload: TSlot) => {
  const isRoomExist = await Room.findById(payload.room);
  if (!isRoomExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room is not found!');
  }
  if (isRoomExist.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You can create slot, Because this room is already deleted. !',
    );
  }
  const generateSlots = generateTimeSlots(payload, 60);
  const result = await Slot.insertMany(generateSlots);
  return result;
};

const getAvailableSlotsFromDB = async (query: Record<string, unknown>) => {
  const { date, roomId } = query;
  const queryObj: Record<string, unknown> = {};

  if (date) {
    queryObj.date = date;
  }

  if (roomId) {
    queryObj.room = roomId;
  }

  const result = await Slot.find({ ...queryObj, isBooked: false });
  return result;
};

export const slotService = {
  createSlotIntoDB,
  getAvailableSlotsFromDB,
};
