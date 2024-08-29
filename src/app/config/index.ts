import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd() + '/.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASS,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  payment_url: process.env.PAYMENT_URL,
  payment_verify_url: process.env.PAYMENT_VERIFY_URL,
  store_id: process.env.STORE_ID,
  signature_key: process.env.SIGNATURE_KEY,
};
