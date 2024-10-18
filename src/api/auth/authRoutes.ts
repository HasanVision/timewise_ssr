import { Router } from 'express';
import  register  from './register';
import  login  from './login';
import { logout } from './logout';
import  checkSession  from '../middlewares/checkSession';
import  magicVerifyToken  from './verifyMagicLink';
import fetchAndStoreIPInfo from '../middlewares/ipInfo';
import  currentUser  from './currentUser';
import forgotPasswordHandler from './forgotPassword';
import verifyResetPasswordTokenHandler from './verifyResetPasswordToken';
import newPasswordHandler from './newPasswordHandler';


import SettingsRoutes from './accountSettings/settingsRoutes';

const AuthRoutes = Router();


AuthRoutes.post('/register', register);
AuthRoutes.post('/login', login);
AuthRoutes.post('/logout', logout);
AuthRoutes.get('/check-session',  checkSession);
AuthRoutes.post('/verify-magic-link', magicVerifyToken);
AuthRoutes.get('/current-user', currentUser );
AuthRoutes.post('/forgot-password', forgotPasswordHandler);
AuthRoutes.post('/verify-reset-password-token', verifyResetPasswordTokenHandler);
AuthRoutes.post('/new-password', newPasswordHandler);


AuthRoutes.use('/settings', SettingsRoutes);


export default AuthRoutes;

// TODO: test Ip info middleware when the app is deployed
// TODO: test Ip COMPARE when the app is deployed