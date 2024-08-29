import express from 'express';
import { userController } from './user.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
const router = express.Router();

router.get('/getMe', auth('admin', 'user'), userController.getMe);
router.get('/', auth('admin'), userController.getAllUser);
router.delete('/:id', auth('admin'), userController.deleteUser);
router.patch(
  '/:id',
  auth('admin'),
  validateRequest(userValidation.userRoleUpdateValidationSchema),
  userController.updateRole,
);

export const usersRoutes = router;
