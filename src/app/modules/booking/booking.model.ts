import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>({
  room: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Room',
  },
  slots: [{ type: Schema.Types.ObjectId, required: true, ref: 'Slot' }],
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  date: {
    type: String,
    required: true,
  },
  isConfirmed: {
    type: String,
    enum: ['confirmed', 'unconfirmed', 'canceled'],
    default:"unconfirmed"
  },
  totalAmount: {
    type: Number,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});
export const Booking = model<TBooking>('Booking', bookingSchema);
