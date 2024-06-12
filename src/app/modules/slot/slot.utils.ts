import { TSlot } from './slot.interface';

const convertToMinutes = (timeStr: string) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

const convertToTimeStr = (minutes: number) => {
  const hours = String(Math.floor(minutes / 60)).padStart(2, '0');
  const mins = String(minutes % 60).padStart(2, '0');
  return `${hours}:${mins}`;
};

export const generateTimeSlots = (
  payload: TSlot,
  slotDuration: number,
): TSlot[] => {
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

  return slots;
};
