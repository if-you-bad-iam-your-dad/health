import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';

export default function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow z-50">
      <div className="max-w-full px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center text-xl font-bold text-indigo-600">
                <Heart className="h-8 w-8 mr-2" />
                HealthCare
              </Link>
            </div>
          </div>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}