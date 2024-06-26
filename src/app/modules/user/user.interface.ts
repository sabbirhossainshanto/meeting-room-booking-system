import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

/* eslint-disable no-unused-vars */
export interface TUser {
  name: string;
  email: string;
  password: string;
  phone: string
  address: string;
  role: 'admin' | 'user';
}

export type TLoginUser = {
  email: string;
  password: string;
};

export interface TUserMethods extends Model<TUser> {
  isUserExist(email: string): Promise<TUser>;
  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
