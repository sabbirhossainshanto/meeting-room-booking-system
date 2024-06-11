import express from 'express';
import { userController } from './user.controller';
import validateRequest from '../middlewares/validateRequest';
import { userValidation } from './user.validation';
const router = express.Router();

router.post(
  '/signup',
  validateRequest(userValidation.signupUserValidationSchema),
  userController.signupUser,
);

export const userRoutes = router;
