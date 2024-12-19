import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/common';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <FileQuestion className="h-16 w-16 text-indigo-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Page Not Found
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex justify-center">
            <Link to="/dashboard">
              <Button variant="primary" className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}