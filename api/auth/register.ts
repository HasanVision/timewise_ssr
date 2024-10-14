import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../../models/User';  // Make sure to import the model

export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, primaryEmail, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { primaryEmail } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
       firstName,
       lastName,
       primaryEmail,
       password: hashedPassword,
       
    });

    return res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};