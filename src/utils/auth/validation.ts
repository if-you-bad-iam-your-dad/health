import { validateEmail } from '../validation/emailRules';
import { getPasswordErrors } from '../validation/passwordRules';

export const validateLoginCredentials = (email: string, password: string) => {
  const errors: { email?: string; password?: string } = {};

  const emailError = validateEmail(email);
  if (emailError) {
    errors.email = emailError;
  }

  const passwordErrors = getPasswordErrors(password);
  if (passwordErrors.length > 0) {
    errors.password = passwordErrors.join('. ');
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};