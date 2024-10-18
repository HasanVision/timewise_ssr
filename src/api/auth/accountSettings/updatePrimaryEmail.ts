import { User } from "../../../../models/User";
import { RequestHandler } from "express";

export const UpdatePrimaryEmailApi: RequestHandler = async (req, res) => {

    const { primaryEmail } = req.body;
    
    const userId = req.session.userId;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        
        const existingUser = await User.findOne({ where: { primaryEmail } });
        if (existingUser && existingUser.id !== userId) {
             res.status(400).json({ message: 'This email is already in use by another account.' });
             return;
        }

        user.primaryEmail = primaryEmail;
        await user.save();

        res.status(200).json({ message: 'Primary email updated successfully' });

    } catch (error) {
        console.error('Error updating primary email:', error);
        res.status(500).json({ message: 'Server error primary email api', error });
    }
}