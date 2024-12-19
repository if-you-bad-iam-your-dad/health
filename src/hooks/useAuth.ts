import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DEFAULT_CREDENTIALS } from '../config/auth';
import { validateLoginCredentials } from '../utils/validation/loginValidation';
import { useAuth as useAuthContext } from '../contexts/AuthContext';
import type { LoginValidationErrors } from '../utils/validation/loginValidation';

export function useAuthForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<LoginValidationErrors>({});

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setErrors({});

    const validation = validateLoginCredentials(email, password);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsLoading(false);
      return;
    }

    try {
      // For testing purposes, check against default credentials
      if (
        email === DEFAULT_CREDENTIALS.email &&
        password === DEFAULT_CREDENTIALS.password
      ) {
        await login(email, password);
        
        // Get the return URL from location state or default to dashboard
        const from = (location.state as any)?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setErrors({ email: 'Invalid email or password' });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    errors,
    handleLogin,
  };
}