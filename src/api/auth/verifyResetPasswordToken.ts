import { RequestHandler } from 'express';
import { Token } from '../../../models/tokens.js';

const verifyResetPasswordTokenHandler: RequestHandler = async (req, res) => {
  const { token } = req.body;

  if (!token) {
     res.status(400).json({ message: 'Token is required' });
     return
  }

  try {
 
    const resetToken = await Token.findOne({ where: { token } });

    if (!resetToken) {
       res.status(400).json({ message: 'Invalid token' });
       return
    }

    if (resetToken.expiresAt < new Date()) {
       res.status(400).json({ message: 'Token has expired' });
       return
    }

   
    res.status(200).json({ message: 'Token is valid' });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(500).json({ message: 'An error occurred during token verification. Please try again later.' });
  }
};

export default verifyResetPasswordTokenHandler;