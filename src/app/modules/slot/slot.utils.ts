import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TSlot } from './slot.interface';
import { Slot } from './slot.model';

const convertToMinutes = (timeStr: string) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

const convertToTimeStr = (minutes: number) => {
  const hours = String(Math.floor(minutes / 60)).padStart(2, '0');
  const mins = String(minutes % 60).padStart(2, '0');
  return `${hours}:${mins}`;
};

export const generateTimeSlots = async (
  payload: TSlot,
  slotDuration: number,
) => {
  const startMinutes = convertToMinutes(payload.startTime);
  const endMinutes = convertToMinutes(payload.endTime);
  const totalDuration = endMinutes - startMinutes;
  const numberOfSlots = Math.floor(totalDuration / slotDuration);

  const slots = [];
  let currentStart = startMinutes;

  for (let i = 0; i < numberOfSlots; i++) {
    const currentEnd = currentStart + slotDuration;
    slots.push({
      room: payload.room,
      date: payload.date,
      isBooked: payload.isBooked || false,
      startTime: convertToTimeStr(currentStart),
      endTime: convertToTimeStr(currentEnd),
    });
    currentStart = currentEnd;
  }

  const isSlotAlreadyExist = await Slot.find({
    $or: slots.map((slot) => ({
      room: slot.room,
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
    })),
  });

  if (isSlotAlreadyExist?.length > 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You cant create slot, Already slot is available in this room',
    );
  }

  return slots;
};
