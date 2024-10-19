import { Request, RequestHandler, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../../../models/User'; 
import { Op } from 'sequelize';


const login: RequestHandler = async (req: Request, res: Response) => {
//   console.log('Login route hit');
  const { email, password } = req.body; 

  try {
  
    const user = await User.findOne({
      where: {
        [Op.or]: [{ primaryEmail: email }, { secondaryEmail: email }],
      },
    });
    if (!user) {
       res.status(400).json({ message: 'User not found' });
       return;
    }

   
    // console.log('Retrieved user:', user);
    
  
    const storedPassword = user.password ;
    if (!storedPassword) {
      res.status(400).json({ message: 'invalid credentials'})
    }
   //  console.log('Retrieved password:', storedPassword);


    const isMatch = await bcrypt.compare(password, storedPassword);
    if (!isMatch) {
       res.status(400).json({ message: 'Invalid credentials' });
       return;
    }

   
    req.session.userId = user.id;
    req.session.save((err) => {
      if (err) {
        console.error('Error saving session:', err);
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