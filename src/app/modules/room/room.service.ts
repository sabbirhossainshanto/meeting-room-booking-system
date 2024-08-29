/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TRoom } from './room.interface';
import { Room } from './room.model';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import QueryBuilder from '../../builder/QueryBuilder';
import { Slot } from '../slot/slot.model';

const createRoomIntoDB = async (files: any, payload: TRoom) => {
  if (files) {
    const uploadResults = await Promise.all(
      files.map((file: any) => sendImageToCloudinary(file.filename, file.path)),
    );
    payload.images = uploadResults?.map((item) => item.secure_url);
  }

  const result = await Room.create(payload);
  return result;
};

const getAllRoomsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Room.find({ isDeleted: false }), query)
    .search(['name', 'amenities'])
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await productQuery.modelQuery;
  return result;
};

const getSingleRoomsFromDB = async (id: string) => {
  const result = await Room.findById(id);
  return result;
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
  await Slot.deleteMany({ room: isRoomExist._id });
  const result = await Room.findByIdAndDelete(id, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const roomService = {
  createRoomIntoDB,
  getAllRoomsFromDB,
  getSingleRoomsFromDB,
  updateSingleRoomsFromDB,
  deleteSingleRoomsFromDB,
};
