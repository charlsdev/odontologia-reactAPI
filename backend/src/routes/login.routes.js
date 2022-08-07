import { Router } from 'express';

import { 
   login, 
   register 
} from '../controllers/login.controllers.js';

const router = Router();

router.post('/register', register);
router.post('/', login);

export default router;
