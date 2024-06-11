import httpStatus from 'http-status';
import sendResponse from '../utils/sendResponse';
import { userService } from './user.service';
import catchAsync from '../utils/catchAsync';

const signupUser = catchAsync(async (req, res) => {
  const result = await userService.signupUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully!',
    data: result,
  });
});

export const userController = {
  signupUser,
};
