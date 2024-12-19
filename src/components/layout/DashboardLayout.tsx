import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <TopBar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
