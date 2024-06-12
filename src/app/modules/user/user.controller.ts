import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { userService } from './user.service';
import catchAsync from '../../utils/catchAsync';
import config from '../../config';

const signupUser = catchAsync(async (req, res) => {
  const result = await userService.signupUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully!',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await userService.loginUser(req.body);
  const { refreshToken, accessToken, user } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully!',
    token: accessToken,
    data: user,
  });
});

export const userController = {
  signupUser,
  loginUser,
};
