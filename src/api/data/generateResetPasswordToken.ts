import { Token } from "../../../models/tokens.js";
import crypto from 'crypto';

export const generateResetPasswordToken = async (email: string) => {
    const token = crypto.randomUUID(); 
    const expires = new Date(Date.now() + 3600 * 1000); 

 
    const existingToken = await Token.findOne({
        where: { email },
    });

    if (existingToken) {

        await Token.destroy({
            where: { id: existingToken.id },
        });
    }

    const newResetToken = await Token.create({
        email,
        token,
        expiresAt: expires,
        tokenType: 'reset_password_verification',
    });


    const tokenValue = newResetToken.getDataValue('token');
    // console.log('Reset token created:', newResetToken);
    // console.log('Token value:', tokenValue);

    return tokenValue;
};