import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { slotValidation } from './slot.validation';
import { slotController } from './slot.controller';
const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(slotValidation.createSlotValidationSchema),
  slotController.createSlot,
);
router.get('/availability', slotController.getAvailableSlots);
router.get('/:slotId', slotController.getSingleSlot);

router.put(
  '/:slotId',
  auth('admin'),
  validateRequest(slotValidation.updateSlotValidationSchema),
  slotController.updateSlot,
);
router.delete('/:slotId', auth('admin'), slotController.deleteSlot);

export const slotRoutes = router;
