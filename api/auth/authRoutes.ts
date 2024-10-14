import { Router } from 'express';
import { register } from './register';

const router = Router();

// Registration route
router.post('/register', register);

export default router;