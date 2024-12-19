import { useState, useCallback } from 'react';

interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
}

interface ValidationErrors {
  [key: string]: string;
}

export function useForm<T extends { [key: string]: any }>(
  initialValues: T,
  validationRules: { [K in keyof T]?: ValidationRules } = {}
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ [K in keyof T]?: boolean }>({});

  const validate = useCallback(
    (fieldName: keyof T, value: any): string => {
      const rules = validationRules[fieldName];
      if (!rules) return '';

      if (rules.required && !value) {
        return 'This field is required';
      }

      if (rules.minLength && value.length < rules.minLength) {
        return `Minimum length is ${rules.minLength} characters`;
      }

      if (rules.maxLength && value.length > rules.maxLength) {
        return `Maximum length is ${rules.maxLength} characters`;
      }

      if (rules.pattern && !rules.pattern.test(value)) {
        return 'Invalid format';
      }

      if (rules.custom && !rules.custom(value)) {
        return 'Invalid value';
      }

      return '';
    },
    [validationRules]
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    
    const error = validate(name as keyof T, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const validateAll = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(values).forEach((key) => {
      const error = validate(key as keyof T, values[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    setValues,
  };
}