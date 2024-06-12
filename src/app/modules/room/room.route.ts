import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { roomValidation } from './room.validation';
import { roomController } from './room.controller';
import auth from '../../middlewares/auth';

const router = express.Router();
router.post(
  '/',
  auth('admin'),
  validateRequest(roomValidation.createRoomValidationSchema),
  roomController.createRoom,
);

router.put(
  '/:id',
  auth('admin'),
  validateRequest(roomValidation.updateRoomValidationSchema),
  roomController.updateSingleRoom,
);
router.delete(
  '/:id',
  auth('admin'),
  roomController.deleteSingleRoom,
);

router.get('/', auth('admin', 'user'), roomController.getAllRoom);

router.get('/:id', auth('admin', 'user'), roomController.getSingleRoom);

export const roomRoutes = router;
