import { validateEmail } from './emailRules';
import { getPasswordErrors } from './passwordRules';

export interface LoginValidationErrors {
  email?: string;
  password?: string;
}

export const validateLoginCredentials = (email: string, password: string) => {
  const errors: LoginValidationErrors = {};

  const emailError = validateEmail(email);
  if (emailError) {
    errors.email = emailError;
  }

  const passwordErrors = getPasswordErrors(password);
  if (passwordErrors.length > 0) {
    errors.password = passwordErrors[0]; // Show only the first error for better UX
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};