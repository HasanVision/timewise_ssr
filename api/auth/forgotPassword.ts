import { RequestHandler } from 'express';
import { Token } from '../../models/tokens.js';
import { User } from '../../models/User.js';
import { generateResetPasswordToken } from '../data/generateResetPasswordToken.js';
import { sendResetPasswordEmail } from '../mail/mail.js';

const forgotPasswordHandler: RequestHandler = async (req, res) => {
    // console.log('Forgot password request received:', req.body);
    const { email } = req.body;
  
    if (!email) {
      res.status(400).json({ message: 'Email is required' });
      return;
    }
  
    try {
      const user = await User.findOne({ where: { primaryEmail: email } });
      if (!user) {
        res.status(400).json({ message: 'User does not exist' });
        return;
      }
  
      // Generate reset token
      const resetToken = await generateResetPasswordToken(email);
      console.log('Reset token generated:', resetToken);
  
      // Send the reset password email
      await sendResetPasswordEmail(email, resetToken.token);
  
      res.status(200).json({ message: 'Reset password link sent to your email.' });
    } catch (error) {
      console.error('Error processing forgot password request:', error);
      res.status(500).json({ message: 'An error occurred. Please try again later.' });
    }
  };

export default forgotPasswordHandler;