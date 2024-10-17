// import { Token } from "../../models/tokens";

// export const getResetVerificationTokenByEmail = async (
//     email: string
// ) => {
//     try {
//         const token = await Token.findOne({
//             where: { email }
//         });
//         return token;
//     } catch (error) {
//         console.error('Error finding token by email:', error);
//         return null;
//     }
// };