import { resendEmail, updateEmail } from './verifyEmail';
import { sendEmail, verifyToken, updatePassword } from './resetPassword';
import { google } from './passportGoogle';

export const Auth = {
  resendEmail,
  updateEmail,
  sendEmail,
  verifyToken,
  updatePassword,
  google
}