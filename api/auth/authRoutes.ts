import { Router } from 'express';
import  register  from './register';
import  login  from './login';
import { logout } from './logout';
import  checkSession  from '../middlewares/checkSession';

const router = Router();

// Registration route
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/check-session', checkSession);



export default router;