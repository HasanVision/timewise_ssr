import { RequestHandler } from 'express';
import { VerificationToken } from '../../models/pVerificationT.js';
import { User } from '../../models/User.js';  // Import the User model
import { sendWelcomeEmail } from '../mail/mail.js';


declare module 'express-session' {
  interface SessionData {
    userId: number;
  }
}
// TODO:  SHOULD FIX THIS TYPE GLOBALLY

const magicVerifyToken: RequestHandler = async (req, res) => {
  let token = req.body.token;

  if (!token) {
    res.status(400).json({ message: 'Token is required' });
    return;
  }

  // Normalize and log the token before querying
  token = token.trim().toLowerCase();
  // console.log('Normalized token for query:', token);

  try {
    // console.log('Looking for token in DB:', token);
    const verificationToken = await VerificationToken.findOne({
      where: { token },
    });
    
    // console.log('Result from DB query:', verificationToken);

    if (!verificationToken) {
      // console.log('Token not found in the database.');
      res.status(400).json({ message: 'Invalid or expired token' });
      return;
    }

    console.log('Token magic fetched from database:', verificationToken);

    if (verificationToken.expiresAt < new Date()) {
      console.log('Token is expired.');
      res.status(400).json({ message: 'Invalid or expired token' });
      return;
    }

    const user = await User.findOne({
      where: { primaryEmail: verificationToken.primaryEmail },
    });

    if (!user) {
      console.log('User not found.');
      res.status(400).json({ message: 'User not found.' });
      return;
    }

    user.primaryEmailVerified = new Date();
    await user.save();

    // Set session userId for login
    req.session.userId = user.id;

    // Optionally send a welcome email
    await sendWelcomeEmail(user.primaryEmail, user.firstName);

    // Now delete the token, but don't check for the token after this point
    await VerificationToken.destroy({ where: { token } });

    console.log('User verified successfully.');
    res.status(200).json({ message: 'Email verified successfully!' });

  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(500).json({ message: 'An error occurred during verification. Please try again later.' });
  }
};

export default magicVerifyToken;

// TODO: put back the welcome email when deploying to production