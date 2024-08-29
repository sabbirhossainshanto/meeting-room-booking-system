import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { roomService } from './room.service';

const createRoom = catchAsync(async (req, res) => {
  const result = await roomService.createRoomIntoDB(req.files,req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room is created successfully',
    data: result,
  });
});
const getAllRoom = catchAsync(async (req, res) => {
  const result = await roomService.getAllRoomsFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rooms are retrieved successfully!',
    data: result,
  });
});
const getSingleRoom = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await roomService.getSingleRoomsFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room is retrieved successfully!',
    data: result,
  });
});
const updateSingleRoom = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await roomService.updateSingleRoomsFromDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room is updated successfully!',
    data: result,
  });
});
const deleteSingleRoom = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await roomService.deleteSingleRoomsFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room is deleted successfully!',
    data: result,
  });
});

export const roomController = {
  createRoom,
  getAllRoom,
  getSingleRoom,
  updateSingleRoom,
  deleteSingleRoom,
};
