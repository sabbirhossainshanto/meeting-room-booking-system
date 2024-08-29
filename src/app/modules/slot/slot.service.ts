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
  const generateSlots = await generateTimeSlots(payload, 60);
  const result = await Slot.insertMany(generateSlots);
  return result;
};

const getAvailableSlotsFromDB = async (query: Record<string, unknown>) => {
  const { date, roomId, startTime, endTime } = query;
  const queryObj: Record<string, unknown> = {};

  if (date) {
    queryObj.date = date;
  }

  if (roomId) {
    queryObj.room = roomId;
  }
  if (startTime) {
    queryObj.startTime = startTime;
  }
  if (endTime) {
    queryObj.endTime = endTime;
  }

  const result = await Slot.find({ ...queryObj, isBooked: false }).populate(
    'room',
  );
  if (result?.length > 0) {
    return result;
  } else {
    throw new AppError(httpStatus.NOT_FOUND, 'No data found!');
  }
};

const getSingleSlotFromDB = async (id: string) => {
  const result = await Slot.findById(id).populate('room');
  return result;
};

const updateSlotIntoDB = async (id: string, payload: Partial<TSlot>) => {
  const isSlotExist = await Slot.findById(id);
  if (!isSlotExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Slot is not exist!');
  }

  const isRoomExist = await Room.findById(isSlotExist.room);
  if (!isRoomExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room is not exist');
  }

  const isAlreadyPayloadSlotExist = await Slot.findOne({
    $and: [
      {
        room: isSlotExist.room,
        date: payload.date,
        $or: [
          {
            startTime: payload?.startTime,
          },
          {
            endTime: payload?.endTime,
          },
        ],
      },
    ],
  });

  if (isAlreadyPayloadSlotExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Slot is already exist, Please select another slot',
    );
  }

  const result = await Slot.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSlotFromDB = async (id: string) => {
  const isSlotExist = await Slot.findById(id);
  if (!isSlotExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Slot is not exist!');
  }

  const result = await Slot.findByIdAndDelete(id);
  return result;
};

export const slotService = {
  createSlotIntoDB,
  getAvailableSlotsFromDB,
  deleteSlotFromDB,
  updateSlotIntoDB,
  getSingleSlotFromDB,
};
