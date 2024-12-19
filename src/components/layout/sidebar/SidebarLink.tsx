import React from 'react';
import { NavLink } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface SidebarLinkProps {
  to: string;
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

export default function SidebarLink({ to, icon: Icon, label, onClick }: SidebarLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 ease-in-out ${
          isActive
            ? 'bg-indigo-50 text-indigo-700'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`
      }
      onClick={onClick}
    >
      <Icon className="h-5 w-5 mr-3 flex-shrink-0" aria-hidden="true" />
      <span>{label}</span>
    </NavLink>
  );
}