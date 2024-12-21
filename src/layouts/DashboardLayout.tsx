import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/navigation/Sidebar';

export function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 flex-shrink-0 fixed left-0 h-full">  {/* Added fixed positioning */}
        <Sidebar />
      </div>
      <main className="ml-64 flex-1 overflow-x-hidden p-6">  {/* Added ml-64 and overflow-x-hidden */}
        <div className="w-full">  {/* Changed from container mx-auto */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}
