import { Router } from 'express';

import { isAuth } from '../controllers/auth-controller.js';
import { readConnections, createConnection, readConnection, updateConnection, deleteConnection } from '../controllers/connection-controller.js';
import { validateRequest } from '../controllers/validation-controller.js';
import { saveConnectionValidation } from '../util/validators.js';

const router = Router();

router.get('/', isAuth, readConnections);
router.post('/new', isAuth, saveConnectionValidation, validateRequest, createConnection);
router.get('/:connectionId', isAuth, readConnection);
router.put('/:connectionId', isAuth, saveConnectionValidation, validateRequest, updateConnection);
router.delete('/:connectionId', isAuth, deleteConnection);

export default router;