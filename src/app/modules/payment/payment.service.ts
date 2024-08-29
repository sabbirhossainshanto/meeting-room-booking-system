import { join } from 'path';
import { Booking } from '../booking/booking.model';
import { verifyPayment } from './payment.utils';
import { readFileSync } from 'fs';
import { Room } from '../room/room.model';

const confirmationService = async (transactionId: string, status: string) => {
  let greeting;
  let roomName = '';
  let date = '';
  let booking;
  let room;

  if (transactionId) {
    booking = await Booking.findOne({ transactionId });
  }

  if (booking && booking?.room) {
    room = await Room.findById(booking.room);
  }

  const paymentVerifyRes = await verifyPayment(transactionId);
  if (paymentVerifyRes?.pay_status === 'Successful') {
    await Booking.findOneAndUpdate({ transactionId }, { isPaid: true });
  }

  const filePath = join(__dirname, '../../paymentConfirmation/index.html');
  let template = readFileSync(filePath, 'utf-8');

  if (status === 'success') {
    greeting = 'Thank you for booking!';
  } else {
    greeting = 'Booking failed try again';
  }
  if (room) {
    roomName = room.name;
  }
  if (booking) {
    date = booking.date;
  }
  template = template.replace('{{success}}', status);
  template = template.replace('{{greeting}}', greeting);
  template = template.replace('{{bookingId}}', transactionId || '');
  template = template.replace('{{bookingDate}}', date);
  template = template.replace('{{roomName}}', roomName);
  return template;
};

export const paymentService = {
  confirmationService,
};
