import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TLoginUser, TUser } from './user.interface';
import { User } from './user.model';
import config from '../../config';
import { createToken } from './user.utils';
import { JwtPayload } from 'jsonwebtoken';

const signupUser = async (payload: TUser) => {
  if (payload.password !== payload.confirmPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Password did not matched!');
  }
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExist(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found!');
  }
  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched!');
  }

  const userData = {
    email: user.email,
    role: user.role,
    name: user.name,
  };

  const accessToken = createToken(
    userData,
    config.JWT_ACCESS_SECRET as string,
    config.JWT_ACCESS_EXPIRES_IN as string,
  );

  return {
    accessToken,
    user,
  };
};

const getAllUser = async (user: JwtPayload) => {
  const result = await User.find({ email: { $ne: user.email } });
  return result;
};

const getMe = async (user: JwtPayload) => {
  const result = await User.findOne({ email: user.email });
  return result;
};

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};
const updateRole = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const userService = {
  signupUser,
  loginUser,
  getMe,
  getAllUser,
  deleteUser,
  updateRole,
};
