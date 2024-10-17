import { VerificationToken } from '../../../models/pVerificationT'

export const getMagicVerificationTokenByEmail = async (
    primaryEmail: string
) => {
    try {
        return await VerificationToken.findOne({
            where: { primaryEmail }
        });
    } catch {
        return null;
    }

}