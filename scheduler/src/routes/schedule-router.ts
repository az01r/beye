import { Router } from 'express';

import { addSchedule, removeSchedule } from '../controllers/schedule-controller.js';

const router = Router();

router.post('/', addSchedule);
router.delete('/:scheduleId', removeSchedule);

export default router;