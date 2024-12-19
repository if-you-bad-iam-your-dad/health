import React from 'react';
import { User } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

export default function SidebarProfile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center px-4 py-3 mb-6">
      <div className="flex-shrink-0">
        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
          <User className="h-6 w-6 text-indigo-600" />
        </div>
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">{user.name}</p>
        <p className="text-xs text-gray-500">{user.role}</p>
      </div>
    </div>
  );
}