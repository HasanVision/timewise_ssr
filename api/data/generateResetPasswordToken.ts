import { Token } from "../../models/tokens.js";
import crypto from 'crypto';

export const generateResetPasswordToken = async (email: string) => {
    const token = crypto.randomUUID(); // Generate a unique token
    const expires = new Date(Date.now() + 3600 * 1000); // Token expires in 1 hour

    // Check if there's already a reset token for this email
    const existingToken = await Token.findOne({
        where: { email },
    });

    if (existingToken) {
        // Delete the old token if it exists
        await Token.destroy({
            where: { id: existingToken.id },
        });
    }

    // Create a new reset token in the database
    const newResetToken = await Token.create({
        email,
        token,
        expiresAt: expires,
        tokenType: 'reset_password_verification',
    });


    const tokenValue = newResetToken.getDataValue('token');
    console.log('Reset token created:', newResetToken);
    console.log('Token value:', tokenValue);

    return tokenValue; // Return the token value correctly
};