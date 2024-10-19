import { Token } from "../../../../models/tokens";
import { User } from "../../../../models/User";
import { RequestHandler } from "express";

export const verifySecondaryEmailToken: RequestHandler = async (req, res) => {
    const { token } = req.body; 

    if (!token) {
        res.status(400).json({ message: 'Token is required' });
        return;
    }

    try {
        const tokenRecord = await Token.findOne({ where: { token, tokenType: 'secondary_email_verification' } });

        if (!tokenRecord || tokenRecord.getDataValue('expiresAt') < new Date()) {
            res.status(400).json({ message: 'Invalid or expired token' });
            return;
        }

        const email = tokenRecord.getDataValue('email');
        console.log('Email from token record:', email);

        if (!email) {
            res.status(400).json({ message: 'Email not associated with token' });
            return;
        }

        // Find the user using the secondary email associated with the token record
        const user = await User.findOne({ where: { secondaryEmail: email } });

        console.log('User Record:', user);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // Verify the secondary email
        user.secondaryEmailVerified = new Date();
        await user.save();

        await Token.destroy({ where: { id: tokenRecord.getDataValue('id') } });

        res.status(200).json({ message: 'Secondary email verified successfully.' });

    } catch (error) {
        console.error('Error verifying secondary email token:', error);
        res.status(500).json({ message: 'Server error during verification', error });
    }
};