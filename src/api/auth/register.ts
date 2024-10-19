import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../../../models/User';
import { generateMagicVerificationToken } from '../data/generateVerificationToken';
import { sendMagicLinkEmail } from '../mail/mail';
import { Op } from 'sequelize';

const register = async (req: Request, res: Response) => {
  const { firstName, lastName, primaryEmail, password } = req.body;

  try {
    
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { primaryEmail },
          { secondaryEmail: primaryEmail },
        ],
      },
    });

    if (existingUser) {
      res.status(400).json({ message: 'User with this email already exists' });
      return;
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = await User.create({
      firstName,
      lastName,
      primaryEmail,
      password: hashedPassword,
    });

     res.status(201).json({ message: 'User registered successfully'});
     const verificationToken = await generateMagicVerificationToken(primaryEmail);

if (verificationToken && verificationToken.token && verificationToken.primaryEmail) {
  console.log(`Verification token for ${verificationToken.primaryEmail}:`, verificationToken.token);  


  await sendMagicLinkEmail(verificationToken.primaryEmail, verificationToken.token);
} else {
  console.error('Failed to generate verification token or primaryEmail.');
}
     

  } catch (error) {
    console.error('Error during registration:', error);
     res.status(500).json({ message: 'Server error', error });
     return
  }
};

export default register;
