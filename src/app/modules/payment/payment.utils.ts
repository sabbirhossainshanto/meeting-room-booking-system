import axios from 'axios';
import config from '../../config';
import { TPayment } from './payment.interface';

export const initiatePayment = async (paymentData: TPayment) => {
  const res = await axios.post(config.payment_url as string, {
    signature_key: config.signature_key,
    store_id: config.store_id,
    tran_id: paymentData.transactionId,
    success_url: `https://meeting-room-booking-gules.vercel.app/api/success?transactionId=${paymentData.transactionId}&status=success`,
    fail_url: `https://meeting-room-booking-gules.vercel.app/api/success?status=failed`,
    cancel_url: 'https://meeting-room-booking-gules.vercel.app/',
    amount: paymentData.amount,
    currency: 'BDT',
    desc: 'Merchant Registration Payment',
    cus_name: paymentData.customerName,
    cus_email: paymentData.customerEmail,
    cus_add1: paymentData.customerAddress,
    cus_add2: 'N/A',
    cus_city: 'N/A',
    cus_state: 'N/A',
    cus_postcode: 'N/A',
    cus_country: 'N/A',
    cus_phone: paymentData.customerPhone,
    type: 'json',
  });
  return res?.data;
};

export const verifyPayment = async (transactionId: string) => {
  const res = await axios.get(config.payment_verify_url as string, {
    params: {
      store_id: config.store_id,
      signature_key: config.signature_key,
      type: 'json',
      request_id: transactionId,
    },
  });
  return res.data;
};
