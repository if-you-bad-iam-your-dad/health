import type { User } from '../../types';

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    age: 35,
    role: 'patient',
    language: 'en',
    emergencyContact: {
      name: 'Jane Doe',
      phone: '+1234567890',
      relation: 'Spouse',
    },
  },
  {
    id: '2',
    name: 'Dr. Sarah Smith',
    email: 'sarah@example.com',
    age: 42,
    role: 'admin',
    language: 'en',
  },
];

// API function
export const getUsers = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockUsers;
};