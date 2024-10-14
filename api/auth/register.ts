import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../../models/User';

export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, primaryEmail, password } = req.body;

  try {
    console.log('Registering user:', { firstName, lastName, primaryEmail });

    // Check if user already exists
    const existingUser = await User.findOne({ where: { primaryEmail } });
    if (existingUser) {
      console.log('User already exists:', primaryEmail);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully');

    // Create the new user
    const newUser = await User.create({
      firstName,
      lastName,
      primaryEmail,
      password: hashedPassword,
    });
    console.log('New user created:', newUser);

    return res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};