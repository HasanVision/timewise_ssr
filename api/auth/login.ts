import { Request, RequestHandler, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../../models/User'; 

declare module 'express-session' {
  interface SessionData {
    userId: number;
  }
}

const login: RequestHandler = async (req, res) => {
//   console.log('Login route hit');
  const { email, password } = req.body; 

  try {
    // Check if user exists
    const user = await User.findOne({ where: { primaryEmail: email } });
    if (!user) {
       res.status(400).json({ message: 'User not found' });
       return;
    }

    // Debugging: Log retrieved user details
   //  console.log('Retrieved user:', user);
    
    // Retrieve the password through the Sequelize getter
    const storedPassword = user.get('password') ;
   //  console.log('Retrieved password:', storedPassword);

    // Compare password
    const isMatch = await bcrypt.compare(password, storedPassword);
    if (!isMatch) {
       res.status(400).json({ message: 'Invalid credentials' });
       return;
    }

    // Set up session
    req.session.userId = user.id;
    req.session.save((err) => {
      if (err) {
         res.status(500).json({ message: 'Session saving failed' });
         return;
      }
       res.status(200).json({ message: 'Logged in successfully' });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export default login;