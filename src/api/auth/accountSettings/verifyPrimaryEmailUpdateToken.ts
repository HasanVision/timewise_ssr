import { Token } from '../../../../models/tokens';
import { User } from '../../../../models/User';
import { RequestHandler } from 'express';

export const verifyPrimaryEmailUpdateToken: RequestHandler = async (req, res) => {
    const { token, userId } = req.body;

    if (!token || !userId) {
        res.status(400).json({ message: 'Token and user ID are required' });
        return;
    }

    try {
        const tokenRecord = await Token.findOne({
            where: { userId, token, tokenType: 'primary_email_update_verification' },
        });

        if (!tokenRecord || new Date(tokenRecord.getDataValue('expiresAt')) < new Date()) {
            res.status(400).json({ message: 'Invalid or expired token' });
            return;
        }

        const user = await User.findByPk(userId);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        user.primaryEmail = tokenRecord.getDataValue('email');
        await user.save();

        await Token.destroy({ where: { id: tokenRecord.getDataValue('id') } });

        res.status(200).json({ message: 'Primary email updated successfully.' });

    } catch (error) {
        console.error('Error verifying primary email update token:', error);
        res.status(500).json({ message: 'Server error during verification', error });
    }
};