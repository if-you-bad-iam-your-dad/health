import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50"> {/* Added bg-gray-50 */}
      <TopBar />
      <div className="flex flex-1 pt-16"> {/* Add pt-16 to account for fixed TopBar */}
        <Sidebar />
        <main className="flex-1 p-4 overflow-auto max-w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
