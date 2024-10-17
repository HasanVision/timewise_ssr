import { RequestHandler } from 'express';
import { Token } from '../../../models/tokens.js';
import { User } from '../../../models/User.js';
import bcrypt from 'bcryptjs';
import { sendPasswordResetSuccessEmail } from '../mail/mail.js';

const newPasswordHandler: RequestHandler = async (req, res) => {
    const { token, password } = req.body;

    console.log('Token received:', token);
    console.log('Password received:', password);

    if (!token || !password) {
        res.status(400).json({ message: 'Token and new password are required' });
        return;
    }

    try {

        const resetToken = await Token.findOne({ where: { token } });

        // console.log('Reset token details:', resetToken);

        // Check if the token exists and is not expired
        if (!resetToken) {
            res.status(400).json({ message: 'Invalid token' });
            return;
        }

        if (resetToken.expiresAt < new Date()) {
            res.status(400).json({ message: 'Token has expired' });
            return;
        }

 
        const email = resetToken.getDataValue('email');
        // console.log('Email associated with token:', email);


        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed password:', hashedPassword);


        const [updated] = await User.update(
            { password: hashedPassword },
            { where: { primaryEmail: email } }
        );



        if (updated === 0) {
            res.status(400).json({ message: 'Password update failed. User not found.' });
            return;
        }

  
        await sendPasswordResetSuccessEmail(email);

        await Token.destroy({ where: { token } });

        res.status(200).json({ message: 'Password reset successfully!' });
    } catch (error) {
        console.error('Error in newPasswordHandler:', error);
        res.status(500).json({ message: 'An error occurred. Please try again later.' });
    }
};

export default newPasswordHandler;