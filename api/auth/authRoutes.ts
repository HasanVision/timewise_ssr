import { Router } from 'express';
import  register  from './register';
import  login  from './login';
import { logout } from './logout';
import  checkSession  from '../middlewares/checkSession';
import  magicVerifyToken  from './verifyMagicLink';

const AuthRoutes = Router();

// Registration route
AuthRoutes.post('/register', register);
AuthRoutes.post('/login', login);
AuthRoutes.post('/logout', logout);
AuthRoutes.get('/check-session', checkSession);
AuthRoutes.post('/verify-magic-link', magicVerifyToken);



export default AuthRoutes;