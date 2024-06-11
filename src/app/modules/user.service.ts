import { TUser } from './user.interface';
import { User } from './user.model';

const signupUser = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

export const userService = {
  signupUser,
};
