import { Schema, model } from 'mongoose';
import { TSlot } from './slot.interface';

const slotSchema = new Schema<TSlot>({
  room: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Room',
  },
  date: {
    type: String,
    required: true,
  },
  isBooked: {
    type: Boolean,
    required: true,
    default: false,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

export const Slot = model<TSlot>('Slot', slotSchema);
