import { Token } from "../../../models/tokens.js";
import crypto from 'crypto';

export const generateSecondaryEmailVToken = async (userId: number, email: string) => {
    const token = crypto.randomUUID(); 
    const expires = new Date(Date.now() + 3600 * 1000); 

 
    const existingToken = await Token.findOne({
        where: { userId },
    });

    if (existingToken) {

        await Token.destroy({
            where: { id: existingToken.id },
        });
    }

    const newResetToken = await Token.create({
        email,
        userId,
        token,
        expiresAt: expires,
        tokenType: 'secondary_email_verification',
    });


    const tokenValue = newResetToken.getDataValue('token');
    console.log('Reset token created:', newResetToken);
    console.log('Token value:', tokenValue);

    return tokenValue;
};