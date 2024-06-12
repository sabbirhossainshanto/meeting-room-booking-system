import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TRoom } from './room.interface';
import { Room } from './room.model';

const createRoomIntoDB = async (payload: TRoom) => {
  const result = await Room.create(payload);
  return result;
};

const getAllRoomsFromDB = async () => {
  const result = await Room.find({ isDeleted: false });
  return result;
};
const getSingleRoomsFromDB = async (id: string) => {
  const isRoomExist = await Room.findById(id);
  if (!isRoomExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room is not found!');
  }
  if (isRoomExist.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room is deleted!');
  }

  return isRoomExist;
};

const updateSingleRoomsFromDB = async (id: string, payload: Partial<TRoom>) => {
  const isRoomExist = await Room.findById(id);
  if (!isRoomExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room is not found!');
  }
  const result = await Room.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteSingleRoomsFromDB = async (id: string) => {
  const isRoomExist = await Room.findById(id);
  if (!isRoomExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room is not found!');
  }
  if (isRoomExist.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room is already deleted!');
  }
  const result = await Room.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const roomService = {
  createRoomIntoDB,
  getAllRoomsFromDB,
  getSingleRoomsFromDB,
  updateSingleRoomsFromDB,
  deleteSingleRoomsFromDB,
};
