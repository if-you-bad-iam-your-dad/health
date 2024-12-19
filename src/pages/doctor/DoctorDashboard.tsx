import React from 'react';
import DashboardStats from './DashboardStats';
import AppointmentList from './AppointmentList';
import PatientQueries from './PatientQueries';

export default function DoctorDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Doctor Dashboard</h1>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AppointmentList />
        <PatientQueries />
      </div>
    </div>
  );
}