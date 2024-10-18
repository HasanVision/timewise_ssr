import { User } from "../../../../models/User";
import { RequestHandler } from "express";

export const updateName: RequestHandler = async (req, res) => {

    const { firstname, lastname } = req.body;
    
    const userId = req.session.userId;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        user.firstName = firstname;
        user.lastName = lastname;
        await user.save();

        res.status(200).json({ message: 'Name updated successfully' });

    } catch (error) {
        console.error('Error updating name:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}