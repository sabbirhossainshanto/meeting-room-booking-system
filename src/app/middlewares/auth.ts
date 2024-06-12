import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const tokenWithBearer = req.headers.authorization;
    const token = tokenWithBearer?.split(' ')[1];

    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized, you dont have token',
      );
    }

    const decoded = jwt.verify(
      token,
      config.JWT_ACCESS_SECRET as string,
    ) as JwtPayload;
    const { role, email } = decoded;

    const user = await User.isUserExist(email);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
    }

    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized, you are wrong user',
      );
    }
    req.user = decoded;
    next();
  });
};

export default auth;
