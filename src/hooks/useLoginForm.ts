import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
  general?: string;
}

export const useLoginForm = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '', general: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const response = await queries.auth.login(credentials, {
        onError: (error: any) => {
          setErrors({
            general: error.response?.data?.message || 
                    error.response?.data?.error ||
                    error.message ||
                    'Login failed. Please try again.',
          });
        }
      });
      
      // Update navigation based on user role
      switch (response.user.role) {
        case 'doctor':
          navigate('/doctor/overview');
          break;
        case 'patient':
          navigate('/patient/profile');
          break;
        case 'admin':
          navigate('/admin/dashboard');
          break;
        default:
          navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    credentials,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
  };
};