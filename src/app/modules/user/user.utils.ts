import jwt from 'jsonwebtoken';
export const createToken = (
  payload: { email: string; role: string },
  jwtAccessSecret: string,
  jwtExpiresIn: string,
) => {
  return jwt.sign(payload, jwtAccessSecret, {
    expiresIn: jwtExpiresIn,
  });
};
