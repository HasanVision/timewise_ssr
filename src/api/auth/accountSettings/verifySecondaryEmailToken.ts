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

        // Find the user using the token's userId instead of the email, as the email might not yet be in the user record
        const userId = tokenRecord.getDataValue('userId');
        const user = await User.findByPk(userId);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // Now update the user's secondary email since the token is valid
        user.secondaryEmail = email;
        user.secondaryEmailVerified = new Date();
        await user.save();

        // Destroy the token after successful verification
        await Token.destroy({ where: { id: tokenRecord.getDataValue('id') } });

        res.status(200).json({ message: 'Secondary email verified successfully.' });

    } catch (error) {
        console.error('Error verifying secondary email token:', error);
        res.status(500).json({ message: 'Server error during verification', error });
    }
};