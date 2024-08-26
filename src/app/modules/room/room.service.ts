/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TRoom } from './room.interface';
import { Room } from './room.model';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';

const createRoomIntoDB = async (files: any, payload: TRoom) => {
  if (files) {
    const uploadResults = await Promise.all(
      files.map((file: any) => sendImageToCloudinary(file.filename, file.path)),
    );
    payload.images = uploadResults?.map((item) => item.secure_url);
  }

  const result = await Room.create(payload);
  return result;
  return null;
};

const getAllRoomsFromDB = async () => {
  const result = await Room.find({ isDeleted: false });
  if (result?.length > 0) {
    return result;
  } else {
    throw new AppError(httpStatus.NOT_FOUND, 'No data found!');
  }
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
