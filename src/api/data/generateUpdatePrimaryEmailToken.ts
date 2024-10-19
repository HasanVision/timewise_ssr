
import {Token} from '../../../models/tokens'
import crypto from 'crypto'

export const generateUpdatePrimaryEmailVToken = async (userId: number, email: string) => {
    const token = crypto.randomInt(100_000, 1000_000).toString();
    const expires = new Date(Date.now() + 3600 * 1000)

    const existingToken = await Token.findOne({
        where: {userId},
    });

    if (existingToken) {
        await Token.destroy({
            where: {id: existingToken.id}
        })
    
    }

    const newResetToken = await Token.create({
        email,
        userId,
        token,
        expiresAt: expires,
        tokenType: 'primary_email_update_verification'
    })

    const tokenValue = newResetToken.getDataValue('token');
    console.log('Reset token created:', newResetToken);
    console.log('Token value:', tokenValue);


    return tokenValue;
}