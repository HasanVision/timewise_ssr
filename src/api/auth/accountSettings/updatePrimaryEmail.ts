import { User } from "../../../../models/User";
import { RequestHandler } from "express";
import { Op } from "sequelize";
import { generateUpdatePrimaryEmailVToken } from "src/api/data/generateUpdatePrimaryEmailToken";
import { sendPrimaryOTPEmailVerification } from "src/api/mail/mail";

export const UpdatePrimaryEmailApi: RequestHandler = async (req, res) => {

    const { primaryEmail } = req.body;
    
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
                    { primaryEmail },
                    { secondaryEmail: primaryEmail }
                ]
            }
        });

        if (existingUser) {
            res.status(400).json({ message: 'This email is already in use by another account.' });
            return;
        }

        // user.primaryEmail = primaryEmail;
        // await user.save();


        const tokenValue = await generateUpdatePrimaryEmailVToken(userId as number, primaryEmail)
        await sendPrimaryOTPEmailVerification(primaryEmail, tokenValue)
        res.status(200).json({ message: 'An email with OTP has been sent to you!' });

    } catch (error) {
        console.error('Error updating primary email:', error);
        res.status(500).json({ message: 'Server error primary email api', error });
    }
}