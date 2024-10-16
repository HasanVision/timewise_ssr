import { Router } from 'express';
import  register  from './register';
import  login  from './login';
import { logout } from './logout';
import  checkSession  from '../middlewares/checkSession';
import  magicVerifyToken  from './verifyMagicLink';
import fetchAndStoreIPInfo from '../middlewares/ipInfo';
import  currentUser  from './currentUser';

const AuthRoutes = Router();

// Registration route
AuthRoutes.post('/register', register);
AuthRoutes.post('/login', login);
AuthRoutes.post('/logout', logout);
AuthRoutes.get('/check-session',  checkSession);
AuthRoutes.post('/verify-magic-link', magicVerifyToken);
AuthRoutes.get('/current-user', currentUser );



export default AuthRoutes;