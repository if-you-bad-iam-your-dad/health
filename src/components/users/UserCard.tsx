import React from 'react';
import { User, Mail, Phone } from 'lucide-react';
import type { User as UserType } from '../../types';
import { Link } from 'react-router-dom';

interface UserCardProps {
  user: UserType;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <Link
      to={`/users/${user.id}`}
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
    >
      <div className="flex items-start space-x-4">
        <div className="p-2 bg-indigo-100 rounded-full">
          <User className="h-6 w-6 text-indigo-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-lg font-medium text-gray-900 truncate">
            {user.name}
          </p>
          <div className="mt-1 flex items-center text-sm text-gray-500">
            <Mail className="flex-shrink-0 mr-1.5 h-4 w-4" />
            <p className="truncate">{user.email}</p>
          </div>
          {user.emergencyContact?.phone && (
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <Phone className="flex-shrink-0 mr-1.5 h-4 w-4" />
              <p className="truncate">{user.emergencyContact.phone}</p>
            </div>
          )}
        </div>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            user.role === 'admin'
              ? 'bg-purple-100 text-purple-800'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {user.role}
        </span>
      </div>
    </Link>
  );
}