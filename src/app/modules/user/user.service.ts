import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TLoginUser, TUser } from './user.interface';
import { User } from './user.model';
import config from '../../config';
import { createToken } from './user.utils';

const signupUser = async (payload: TUser) => {
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
  };

  const accessToken = createToken(
    userData,
    config.JWT_ACCESS_SECRET as string,
    config.JWT_ACCESS_EXPIRES_IN as string,
  );
  const refreshToken = createToken(
    userData,
    config.JWT_REFRESH_SECRET as string,
    config.JWT_REFRESH_EXPIRES_IN as string,
  );

  return {
    accessToken,
    refreshToken,
    user,
  };
};

export const userService = {
  signupUser,
  loginUser,
};
