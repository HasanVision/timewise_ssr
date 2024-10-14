import { VerificationToken } from '../../models/pVerificationT'

export const getMagicVerificationTokenByEmail = async (
    email: string
) => {
    try {
        return await VerificationToken.findOne({
            where: { email }
        });
    } catch {
        return null;
    }

}