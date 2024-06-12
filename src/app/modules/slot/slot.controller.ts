import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { slotService } from './slot.service';

const createSlot = catchAsync(async (req, res) => {
  const result = await slotService.createSlotIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Slot created successfully!',
    data: result,
  });
});
const getAvailableSlots = catchAsync(async (req, res) => {
  const result = await slotService.getAvailableSlotsFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Slot are retrieved successfully!',
    data: result,
  });
});

export const slotController = {
  createSlot,
  getAvailableSlots
};
