import { User } from "../../../../models/User";
import { RequestHandler } from "express";
import { Op } from "sequelize";

export const UpdateSecondaryEmailApi: RequestHandler = async (req, res) => {

    const { secondaryEmail } = req.body;
    
    const userId = req.session.userId;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        
        const existingUser = await User.findOne({
            where: {
                id: { [Op.ne]: userId },
                [Op.or]: [
                    { primaryEmail: secondaryEmail },
                    { secondaryEmail }
                ]
            }
        });

        if (existingUser) {
            res.status(400).json({ message: 'This email is already in use by another account.' });
            return;
        }

        user.secondaryEmail = secondaryEmail;
        await user.save();

        res.status(200).json({ message: 'Secondary email updated successfully' });

    } catch (error) {
        console.error('Error updating secondary email:', error);
        res.status(500).json({ message: 'Server error secondary email api', error });
    }
}