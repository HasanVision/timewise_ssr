import { Token  } from "../../models/tokens.js"  // Adjust path as necessary
import crypto from 'crypto';


export const generateResetPasswordToken = async (email: string) => {
    console.log('Generating reset password token for email:', email);
  const token = crypto.randomUUID(); // Generate a unique token
  const expires = new Date(Date.now() + 3600 * 1000); // Token expires in 1 hour

  // Check if there's already a reset token for this email
  const existingToken = await Token.findOne({
    where: { email },
  });

  if (existingToken) {
    console.log('Deleting existing token:', existingToken);
    // Delete the old token if it exists
    await Token.destroy({
      where: { id: existingToken.id },
    });
  }

  console.log('Creating new reset token:', token);

  // Create a new reset token in the database
  const newResetToken = await Token.create({
      email,
      token,
      expiresAt: expires,
      tokenType: 'reset_password_verification',
  });
  console.log('Reset token created:', newResetToken);
  return newResetToken; // Ensure this returns the correct token
 
};