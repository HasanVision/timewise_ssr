import { Router } from 'express';
import { register } from './register';
import  login  from './login';

const router = Router();

// Registration route
router.post('/login', (req, res, next) => {
    console.log('Login route hit');  // Make sure this is logged
    next();
  }, login);
router.post('/register', register);
router.post('/login', login);
// router.post('/login', (req, res, next) => {
//     console.log('Login route hit');
//     next();  // Ensure next() is called to continue to the login handler
//   }, login);


export default router;