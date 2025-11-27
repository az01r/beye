import { Router } from 'express';

import { isAuth } from '../controllers/auth-controller.js';
import { getQueriesByConnectionIdValidation, saveQueryValidation } from '../util/validators.js';
import { validateRequest } from '../controllers/validation-controller.js';
import { saveQuery, getQueriesByConnection } from '../controllers/query-controller.js';

const router = Router();

router.post('/save', isAuth, saveQueryValidation, validateRequest, saveQuery);
router.get('/get', isAuth, getQueriesByConnectionIdValidation, validateRequest, getQueriesByConnection);

export default router;