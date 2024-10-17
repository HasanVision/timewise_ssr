import * as crypto from "crypto";
import { getMagicVerificationTokenByEmail } from "./getVerificationTokenByEmail";
import { VerificationToken } from "../../../models/pVerificationT"; 

export const generateMagicVerificationToken = async (primaryEmail: string) => {
  try {

    const existingToken = await getMagicVerificationTokenByEmail(primaryEmail);

    if (existingToken) {

      await VerificationToken.destroy({
        where: { primaryEmail }
      });
    }

    const token = crypto.randomUUID(); 
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);  // 5 minutes from now

    console.log('Token before create:', token);
console.log('PrimaryEmail before create:', primaryEmail);
console.log('ExpiresAt before create:', expiresAt);

    const newToken = await VerificationToken.create({
      token,
      primaryEmail,
      expiresAt,
    });
    console.log('Generated Token:', newToken.token);
console.log('Primary Email:', newToken.primaryEmail);

    return newToken;  
  } catch (error) {
    console.error('Error generating magic verification token:', error);
    throw new Error('Could not generate magic verification token. Please try again later.');
  }
};
