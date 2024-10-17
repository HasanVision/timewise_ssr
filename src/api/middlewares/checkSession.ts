import { RequestHandler, Router } from 'express';
import { Request, Response } from 'express';

const router = Router();



const checkSession: RequestHandler = (req, res) => {
    // console.log('Checking session...', req.session);
    if (req.session && req.session.userId) {
      
        res.status(200).json({ isLoggedIn: true, userId: req.session.userId });
    } else {
      
        res.status(200).json({ isLoggedIn: false });
    }
}

export default checkSession;