import { RequestHandler } from 'express';

export const logout: RequestHandler = (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed', error: err });
    }

    // Clear the cookie
    res.clearCookie('connect.sid', {
      path: '/', // Make sure the path matches your session cookie settings
    });

    return res.status(200).json({ message: 'Logged out successfully' });
  });
};