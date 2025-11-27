import { Router } from 'express';

import { isAuth } from '../controllers/auth-controller.js';
import { saveScheduleValidation } from '../util/validators.js';
import { validateRequest } from '../controllers/validation-controller.js';
import { saveSchedule } from '../controllers/schedule-controller.js';

const router = Router();

router.post('/save', isAuth, saveScheduleValidation, validateRequest, saveSchedule);

export default router;