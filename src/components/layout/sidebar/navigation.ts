import { Home, Calendar, MessageSquare, Users, Settings, Activity, FileText, UserPlus } from 'lucide-react';

interface NavigationItem {
  name: string;
  to: string;
  icon: any;
  section: 'main' | 'management' | 'system';
  requiredRole?: 'admin' | 'patient';
}

export const navigation: NavigationItem[] = [
  // Admin/Doctor Navigation
  {
    name: 'Dashboard',
    to: '/dashboard',
    icon: Home,
    section: 'main',
    requiredRole: 'admin',
  },
  {
    name: 'Patient Management',
    to: '/patients',
    icon: Users,
    section: 'main',
    requiredRole: 'admin',
  },
  {
    name: 'Appointments',
    to: '/appointments',
    icon: Calendar,
    section: 'main',
    requiredRole: 'admin',
  },
  {
    name: 'Patient Queries',
    to: '/queries',
    icon: MessageSquare,
    section: 'management',
    requiredRole: 'admin',
  },
  {
    name: 'Analytics',
    to: '/analytics',
    icon: Activity,
    section: 'management',
    requiredRole: 'admin',
  },
  {
    name: 'Reports',
    to: '/reports',
    icon: FileText,
    section: 'management',
    requiredRole: 'admin',
  },

  // Patient Navigation
  {
    name: 'Dashboard',
    to: '/dashboard',
    icon: Home,
    section: 'main',
    requiredRole: 'patient',
  },
  {
    name: 'My Treatments',
    to: '/treatments',
    icon: Calendar,
    section: 'main',
    requiredRole: 'patient',
  },
  {
    name: 'My Queries',
    to: '/queries',
    icon: MessageSquare,
    section: 'main',
    requiredRole: 'patient',
  },

  // Common Navigation
  {
    name: 'Settings',
    to: '/settings',
    icon: Settings,
    section: 'system',
  },
];