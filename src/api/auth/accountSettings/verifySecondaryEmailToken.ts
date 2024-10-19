import { Token } from "../../../../models/tokens";
import { User } from "../../../../models/User";
import { RequestHandler } from "express";

export const verifySecondaryEmailToken: RequestHandler = async (req, res) => {
    console.log('Request received at /verify-secondary-email');
    const { token } = req.body; 
    console.log('Token from request:', token);

    if (!token) {
        res.status(400).json({ message: 'Token is required' });
        return;
    }

    try {
        const tokenRecord = await Token.findOne({ where: { token, tokenType: 'secondary_email_verification' } });

        if (!tokenRecord) {
            console.error('Token not found or invalid:', token);
            res.status(400).json({ message: 'Invalid or expired token' });
            return;
        }

        const expiresAt = new Date(tokenRecord.getDataValue('expiresAt'));
        if (expiresAt < new Date()) {
            console.error('Token expired:', token);
            res.status(400).json({ message: 'Invalid or expired token' });
            return;
        }
        
        console.log('Token Record:', tokenRecord);

        const email = tokenRecord.getDataValue('email');
        console.log('Email from token record:', email);

        if (!email) {
            console.error('Email not associated with token');
            res.status(400).json({ message: 'Email not associated with token' });
            return;
        }

        const userId = tokenRecord.getDataValue('userId');
        const user = await User.findByPk(userId);

        if (!user) {
            console.error('User not found for ID:', userId);
            res.status(404).json({ message: 'User not found' });
            return;
        }

        user.secondaryEmail = email;
        user.secondaryEmailVerified = new Date();
        await user.save();

        await Token.destroy({ where: { id: tokenRecord.getDataValue('id') } });

        res.status(200).json({ message: 'Secondary email verified successfully.' });

    } catch (error) {
        console.error('Error verifying secondary email token:', error);
        res.status(500).json({ message: 'Server error during verification', error });
    }
};