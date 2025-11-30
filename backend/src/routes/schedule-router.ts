import { Router } from 'express';

import { isAuth } from '../controllers/auth-controller.js';
import { saveScheduleValidation } from '../util/validators.js';
import { validateRequest } from '../controllers/validation-controller.js';
import { createSchedule, deleteSchedule, readSchedule, readSchedules, updateSchedule } from '../controllers/schedule-controller.js';

const router = Router();

router.get('/', isAuth, readSchedules);
router.post('/new', isAuth, saveScheduleValidation, validateRequest, createSchedule);
router.get('/:scheduleId', isAuth, readSchedule);
router.put('/:scheduleId', isAuth, saveScheduleValidation, validateRequest, updateSchedule);
router.delete('/:scheduleId', isAuth, deleteSchedule);

export default router;