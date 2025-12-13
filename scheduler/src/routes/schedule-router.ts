import { Router } from 'express';

import { addSchedule, removeSchedule } from '../controllers/schedule-controller.js';

const router = Router();

router.post('/', /*saveScheduleValidation, validateRequest, */addSchedule);
router.delete('/:scheduleId', removeSchedule);

export default router;