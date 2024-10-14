import * as crypto from "crypto";
import { getMagicVerificationTokenByEmail } from "./getVerificationTokenByEmail.js";
import { VerificationToken } from "../../models/pVerificationT.js";  // Adjust the model import path accordingly

const token = crypto.randomUUID();  // Generate a new token
const expires = new Date(new Date().getTime() + 5 * 60 * 1000);  // Set expiration to 5 minutes from now

export const generateMagicVerificationToken = async (primaryEmail: string, userId: number) => {
  try {
    // Check if there is an existing verification token for the email
    const existingToken = await getMagicVerificationTokenByEmail(primaryEmail);


    if (existingToken) {
      // Delete the existing token
      await VerificationToken.destroy({
        where: { id: existingToken.id }
      });
    }

    // Create and store the new verification token in the database
    const newToken = await VerificationToken.create({
      token: crypto.randomUUID(),
      primaryEmail: primaryEmail, // Make sure this is assigned correctly
      userId,
      expiresAt: new Date(new Date().getTime() + 5 * 60 * 1000),  // Token expires in 5 minutes
    });

    // Return the token to be used in the email
    return newToken;  
  } catch (error) {
    console.error('Error generating magic verification token:', error);
    throw new Error('Could not generate magic verification token. Please try again later.');
  }
};
// export const generateMagicVerificationToken = async (primaryEmail: string, userId: number) => {
//     console.log(`Generating verification token for ${primaryEmail}`);
//   try {
//     // Check if there is an existing verification token for the email
//     const existingToken = await getMagicVerificationTokenByEmail(primaryEmail);

//     if (existingToken) {
//       // If an existing token is found, delete it before creating a new one
//       await VerificationToken.destroy({
//         where: { userId: existingToken.userId }
//       });
//       console.log(`Existing verification token for ${primaryEmail} deleted.`);
//     }

//     // Create and store the new verification token in the database
//     const newToken = await VerificationToken.create({
//       token,
//       userId,
//       primaryEmail,
//       expiresAt: expires,
//     });

//     console.log(`New verification token generated for ${primaryEmail}: ${token}`);
//     return newToken;  // Return the new token for further use (such as emailing)
//   } catch (error) {
//     console.error('Error generating magic verification token:', error);
//     throw new Error('Could not generate magic verification token. Please try again later.');
//   }
// };

// TODO: REDUCE VERIFICATION TOKEN EXPIRATION TIME TO 5 MINUTES