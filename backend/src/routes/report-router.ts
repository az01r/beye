import { Router } from 'express';

import { isAuth } from '../controllers/auth-controller.js';
import { getReportValidation } from '../util/validators.js';
import { validateRequest } from '../controllers/validation-controller.js';
import { readReports, getReport } from '../controllers/report-controller.js';

const router = Router();

router.get('/', isAuth, readReports);
router.post('/', isAuth, getReportValidation, validateRequest, getReport);
// router.delete('/', isAuth, deleteReport);

export default router;