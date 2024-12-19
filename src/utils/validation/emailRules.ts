export const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const validateEmail = (email: string): string | null => {
  if (!email) {
    return 'Email is required';
  }
  if (!EMAIL_PATTERN.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};