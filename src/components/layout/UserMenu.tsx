import React, { useState } from 'react';
import { User, Settings, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LogoutButton from '../auth/LogoutButton';

export default function UserMenu() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex items-center gap-4">
      {/* Notifications */}
      <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100">
        <Bell className="h-6 w-6" />
      </button>

      {/* User Menu */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100"
        >
          <User className="h-6 w-6" />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
            <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
              <p className="font-medium">{user?.name}</p>
              <p className="text-gray-500">{user?.email}</p>
            </div>
            
            <Link
              to="/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Link>
            
            <div className="px-4 py-2 border-t border-gray-100">
              <LogoutButton />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}