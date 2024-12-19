import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { UserCard } from '../../components/users';
import { Button, Input } from '../../components/common';
import { useUsers } from '../../hooks';

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { users, loading, error } = useUsers();

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
        <Button
          variant="primary"
          size="md"
          className="flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="max-w-md">
        <Input
          label="Search users"
          id="search-users"
          name="search"
          icon={Search}
          placeholder="Search by name or email..."
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
        </div>
      ) : error ? (
        <div className="text-center text-red-600">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}