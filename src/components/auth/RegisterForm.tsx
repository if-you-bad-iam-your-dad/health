import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Calendar } from 'lucide-react';
import { useForm } from '../../hooks/useForm';
import { Input, Button } from '../common';
import AuthLayout from './AuthLayout';
import type { RegisterData } from '../../types/auth';

export default function RegisterForm() {
  const navigate = useNavigate();
  const { values, errors, handleChange, handleSubmit } = useForm<RegisterData>({
    initialValues: {
      name: '',
      email: '',
      age: 0,
      password: '',
      role: 'patient',
    },
    onSubmit: async (data) => {
      try {
        // API call would go here
        console.log('Registration data:', data);
        navigate('/login');
      } catch (error) {
        console.error('Registration failed:', error);
      }
    },
  });

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join our healthcare platform"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Full Name"
          id="name"
          name="name"
          icon={User}
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          required
        />

        <Input
          label="Email"
          type="email"
          id="email"
          name="email"
          icon={Mail}
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        <Input
          label="Age"
          type="number"
          id="age"
          name="age"
          icon={Calendar}
          value={values.age}
          onChange={handleChange}
          error={errors.age}
          required
        />

        <Input
          label="Password"
          type="password"
          id="password"
          name="password"
          icon={Lock}
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          helperText="Must be at least 8 characters"
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Register as
          </label>
          <div className="mt-2 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="role"
                value="patient"
                checked={values.role === 'patient'}
                onChange={handleChange}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">Patient</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="role"
                value="doctor"
                checked={values.role === 'doctor'}
                onChange={handleChange}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">Doctor</span>
            </label>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Register
        </Button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </a>
        </p>
      </form>
    </AuthLayout>
  );
}