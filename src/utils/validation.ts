export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export const phoneRegex = /^\+?[\d\s-]{10,}$/;

export const validationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  email: {
    required: true,
    pattern: emailRegex,
  },
  password: {
    required: true,
    pattern: passwordRegex,
    custom: (value: string) => value.length >= 8,
  },
  age: {
    required: true,
    custom: (value: number) => value >= 18 && value <= 120,
  },
  phone: {
    required: true,
    pattern: phoneRegex,
  },
};