import { Router } from 'express';

import { isAuth } from '../controllers/auth-controller.js';
import { saveQueryValidation } from '../util/validators.js';
import { validateRequest } from '../controllers/validation-controller.js';
import { readQueries, createQuery, readQuery, updateQuery, deleteQuery } from '../controllers/query-controller.js';

const router = Router();

router.get('/', isAuth, readQueries);
router.post('/new', isAuth, saveQueryValidation, validateRequest, createQuery);
router.get('/:queryId', isAuth, readQuery);
router.put('/:queryId', isAuth, saveQueryValidation, validateRequest, updateQuery);
router.delete('/:queryId', isAuth, deleteQuery);

export default router;