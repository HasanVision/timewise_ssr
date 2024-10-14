import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../../models/User';
import { generateMagicVerificationToken } from '../data/generateVerificationToken';
import { sendMagicLinkEmail } from '../mail/mail';

const register = async (req: Request, res: Response) => {
  const { firstName, lastName, primaryEmail, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { primaryEmail } });
    if (existingUser) {
       res.status(400).json({ message: 'User already exists' });
       return
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({
      firstName,
      lastName,
      primaryEmail,
      password: hashedPassword,
    });

    // Generate the verification token
    const verificationToken = await generateMagicVerificationToken(primaryEmail, newUser.id);

    // Check if the token and primaryEmail are properly generated
    if (verificationToken && verificationToken.token && verificationToken.primaryEmail) {
      console.log(`Verification token for ${primaryEmail}:`, verificationToken);

      // Send the magic link email
      await sendMagicLinkEmail(verificationToken.primaryEmail, verificationToken.token);
    } else {
      console.error('Failed to send Email .');
    }

    // Return success response
     res.status(201).json({ message: 'User registered successfully', user: newUser });
     return

  } catch (error) {
    console.error('Error during registration:', error);
     res.status(500).json({ message: 'Server error', error });
     return
  }
};

export default register;
