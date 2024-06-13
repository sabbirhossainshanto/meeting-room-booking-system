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

export const slotRoutes = router;
