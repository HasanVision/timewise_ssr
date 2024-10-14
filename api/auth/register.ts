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
      return res.status(400).json({ message: 'User already exists' });
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
    console.log(`Verification token for ${primaryEmail}:`, verificationToken);
    sendMagicLinkEmail(
      verificationToken.email,
      verificationToken.token
    )

    // Send email (you should add your email logic here, e.g., using nodemailer)

    // Return success response
    return res.status(201).json({ message: 'User registered successfully', user: newUser });

  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

export default register;