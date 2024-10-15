import * as crypto from "crypto";
import { getMagicVerificationTokenByEmail } from "./getVerificationTokenByEmail";
import { VerificationToken } from "../../models/pVerificationT"; 

export const generateMagicVerificationToken = async (primaryEmail: string) => {
  try {
    // Check if there is an existing verification token for the email
    const existingToken = await getMagicVerificationTokenByEmail(primaryEmail);

    if (existingToken) {
      // Delete the existing token
      await VerificationToken.destroy({
        where: { primaryEmail }
      });
    }

    // Create and store the new verification token in the database
    const token = crypto.randomUUID();  // Generate a new token
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);  // Set expiration to 5 minutes from now

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

    return newToken;  // Return the new token and email
  } catch (error) {
    console.error('Error generating magic verification token:', error);
    throw new Error('Could not generate magic verification token. Please try again later.');
  }
};
// import * as crypto from "crypto";
// import { getMagicVerificationTokenByEmail } from "./getVerificationTokenByEmail.js";
// import { VerificationToken } from "../../models/pVerificationT.js";  // Adjust the model import path accordingly

// const token = crypto.randomUUID();  // Generate a new token
// const expires = new Date(new Date().getTime() + 5 * 60 * 1000);  // Set expiration to 5 minutes from now

// export const generateMagicVerificationToken = async (primaryEmail: string) => {
//   try {
//     // Check if there is an existing verification token for the email
//     const existingToken = await getMagicVerificationTokenByEmail(primaryEmail);


//     if (existingToken) {
//       // Delete the existing token
//       await VerificationToken.destroy({
//         where: { id: existingToken.id }
//       });
//     }

//     // Create and store the new verification token in the database
//     const newToken = await VerificationToken.create({
//       token: crypto.randomUUID(),
//       primaryEmail: primaryEmail, // Make sure this is assigned correctly
//       expiresAt: new Date(new Date().getTime() + 5 * 60 * 1000),  // Token expires in 5 minutes
//     });

//     // Return the token to be used in the email
//     return newToken;  
//   } catch (error) {
//     console.error('Error generating magic verification token:', error);
//     throw new Error('Could not generate magic verification token. Please try again later.');
//   }
// };

// TODO: REDUCE VERIFICATION TOKEN EXPIRATION TIME TO 5 MINUTES