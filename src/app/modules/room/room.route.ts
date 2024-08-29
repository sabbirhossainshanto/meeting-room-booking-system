import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { roomValidation } from './room.validation';
import { roomController } from './room.controller';
import auth from '../../middlewares/auth';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();
router.post(
  '/',
  auth('admin'),
  upload.array('files', 10),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(roomValidation.createRoomValidationSchema),
  roomController.createRoom,
);

router.put(
  '/:id',
  auth('admin'),
  validateRequest(roomValidation.updateRoomValidationSchema),
  roomController.updateSingleRoom,
);
router.delete('/:id', auth('admin'), roomController.deleteSingleRoom);

router.get('/', roomController.getAllRoom);

router.get('/:id', roomController.getSingleRoom);

export const roomRoutes = router;
