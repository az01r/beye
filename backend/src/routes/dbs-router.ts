import { Router } from 'express';

import { isAuth } from '../controllers/auth-controller.js';
import { getUserConnections, saveConnection } from '../controllers/dbs-controller.js';
import { validateRequest } from '../controllers/validation-controller.js';
import { saveConnnectionValidation } from '../util/validators.js';

const router = Router();

router.post('/save', isAuth, saveConnnectionValidation, validateRequest, saveConnection);
router.get('/get', isAuth, getUserConnections);

export default router;