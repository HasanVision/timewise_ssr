import { RequestHandler } from 'express';

export const logout: RequestHandler = (req, res) => {
  
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed', error: err });
    }

    res.clearCookie('connect.sid', {
      path: '/', 
    });

    return res.status(200).json({ message: 'Logged out successfully' });
  });
};