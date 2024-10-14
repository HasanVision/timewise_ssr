// middleware/checkAuth.js
import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from 'express';

export const checkAuth:RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    if (req.session && req.session.userId) {
      // Session is valid, proceed to the next middleware or route handler
      return next();
    } else {
      // Session is invalid or not found, return an error
      return res.status(401).json({ message: 'Unauthorized access' });
    }
  };