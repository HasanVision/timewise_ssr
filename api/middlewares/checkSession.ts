import { RequestHandler, Router } from 'express';
import { Request, Response } from 'express';

const router = Router();

// Check session route to verify if the user is logged in

const checkSession: RequestHandler = (req, res) => {
    if (req.session && req.session.userId) {
        // User is logged in, return user data or session info
        res.status(200).json({ isLoggedIn: true, userId: req.session.userId });
    } else {
        // User is not logged in
        res.status(200).json({ isLoggedIn: false });
    }
}

export default checkSession;