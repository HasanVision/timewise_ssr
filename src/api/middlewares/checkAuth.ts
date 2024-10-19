// middleware/checkAuth.js
import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from 'express';

export const checkAuth:RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    if (req.session && req.session.userId) {
      
      return next();
    } else {
      console.warn('Unauthorized access attempt detected');
       res.status(401).json({ message: 'Unauthorized access' });
       return
    }
  };