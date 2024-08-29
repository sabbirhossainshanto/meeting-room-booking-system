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


const getSingleSlot = catchAsync(async (req, res) => {
  const { slotId } = req.params;
  const result = await slotService.getSingleSlotFromDB(slotId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Slot retrieve successfully!',
    data: result,
  });
});

const updateSlot = catchAsync(async (req, res) => {
  const { slotId } = req.params;
  const result = await slotService.updateSlotIntoDB(slotId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Slot updated successfully!',
    data: result,
  });
});

const deleteSlot = catchAsync(async (req, res) => {
  const { slotId } = req.params;
  const result = await slotService.deleteSlotFromDB(slotId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Slot deleted successfully!',
    data: result,
  });
});

export const slotController = {
  createSlot,
  getAvailableSlots,
  deleteSlot,
  updateSlot,
  getSingleSlot,

};
