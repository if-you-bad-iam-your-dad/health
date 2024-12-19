// Password validation rules
export const PASSWORD_RULES = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecial: true,
};

export const PASSWORD_PATTERNS = {
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[0-9]/,
  special: /[!@#$%^&*(),.?":{}|<>]/,
};

export const getPasswordErrors = (password: string): string[] => {
  const errors: string[] = [];

  if (password.length < PASSWORD_RULES.minLength) {
    errors.push(`Must be at least ${PASSWORD_RULES.minLength} characters long`);
  }
  if (PASSWORD_RULES.requireUppercase && !PASSWORD_PATTERNS.uppercase.test(password)) {
    errors.push('Must contain at least one uppercase letter');
  }
  if (PASSWORD_RULES.requireLowercase && !PASSWORD_PATTERNS.lowercase.test(password)) {
    errors.push('Must contain at least one lowercase letter');
  }
  if (PASSWORD_RULES.requireNumber && !PASSWORD_PATTERNS.number.test(password)) {
    errors.push('Must contain at least one number');
  }
  if (PASSWORD_RULES.requireSpecial && !PASSWORD_PATTERNS.special.test(password)) {
    errors.push('Must contain at least one special character');
  }

  return errors;
};