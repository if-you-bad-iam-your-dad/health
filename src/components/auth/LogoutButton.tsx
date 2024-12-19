import React from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../common';

export default function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLogout}
      className="flex items-center text-gray-700 hover:text-gray-900"
    >
      <LogOut className="h-4 w-4 mr-2" />
      Logout
    </Button>
  );
}