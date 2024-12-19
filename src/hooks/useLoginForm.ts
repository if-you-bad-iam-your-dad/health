import { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { validateLoginCredentials } from '../utils/validation/loginValidation';
import { validateDoctorLogin, DOCTOR_CREDENTIALS } from '../utils/validation/doctorValidation';

interface LoginCredentials {
  email: string;
  password: string;
}

export function useLoginForm() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    // Clear errors when user types
    setErrors(prev => ({ ...prev, [name]: '' }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const validation = validateLoginCredentials(credentials.email, credentials.password);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsLoading(false);
      return;
    }

    try {
      // Check if it's a doctor login
      const isDoctor = validateDoctorLogin(credentials.email, credentials.password);
      
      if (isDoctor) {
        await login(credentials.email, credentials.password, 'admin');
        navigate('/dashboard');
      } else {
        // Regular patient login
        await login(credentials.email, credentials.password, 'patient');
        const from = (location.state as any)?.from?.pathname || '/dashboard';
        navigate(from);
      }
    } catch (error) {
      setErrors({
        email: 'Invalid email or password',
      });
    } finally {
      setIsLoading(false);
    }
  }, [credentials, login, navigate, location]);

  return {
    credentials,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
  };
}