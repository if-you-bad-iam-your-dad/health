import React, { useState } from 'react';
import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLoginForm } from '../../hooks/useLoginForm';
import Input from '../common/Input';
import Button from '../common/Button';
import AuthLayout from './AuthLayout';
import { DOCTOR_CREDENTIALS } from '../../utils/validation/doctorValidation';
// import 

export default function LoginForm() {
  const { credentials, errors, isLoading, handleChange, handleSubmit } = useLoginForm();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account to continue"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {errors.general && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
            {errors.general}
          </div>
        )}

        <Input
          label="Email address"
          type="email"
          id="email"
          name="email"
          icon={Mail}
          value={credentials.email}
          onChange={handleChange}
          error={errors.email}
          autoComplete="email"
          required
          disabled={isLoading}
        />

        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          icon={Lock}
          value={credentials.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="current-password"
          required
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-500"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
          disabled={isLoading}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link
              to="/forgot-password"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          icon={<LogIn className="w-4 h-4" />}
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>

        <div className="text-center">
          <span className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </span>
        </div>
      </form>

      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="text-sm text-center text-gray-600">
            <p className="font-medium mb-2">Test Credentials</p>
            <div className="space-y-1">
              <p className="font-medium text-indigo-600">Doctor Login:</p>
              <p>Email: {DOCTOR_CREDENTIALS.email}</p>
              <p>Password: {DOCTOR_CREDENTIALS.password}</p>
              <p className="mt-2 font-medium text-indigo-600">Patient Login:</p>
              <p>Email: test@example.com</p>
              <p>Password: Test123!</p>
            </div>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}