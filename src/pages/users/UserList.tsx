import React from 'react';
import { Loader } from 'lucide-react';
import { UserCard } from '../../components/users';
import { useUsers } from '../../hooks';
import { translations } from '../../utils/translations';

export default function UserList() {
  const { users, loading, error } = useUsers();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="h-8 w-8 animate-spin text-indigo-600" />
        <span className="ml-2">{translations.hi.loading}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {translations.hi.error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}