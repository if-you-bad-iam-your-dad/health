import React from 'react';
import { Users, Calendar, MessageSquare, Activity } from 'lucide-react';

const stats = [
  { name: 'Total Patients', value: '120', icon: Users, change: '+5.4%' },
  { name: 'Appointments Today', value: '15', icon: Calendar, change: '+2.8%' },
  { name: 'Pending Queries', value: '8', icon: MessageSquare, change: '-1.2%' },
  { name: 'Success Rate', value: '98.5%', icon: Activity, change: '+3.1%' },
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
        >
          <dt>
            <div className="absolute bg-indigo-500 rounded-md p-3">
              <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500 truncate">
              {stat.name}
            </p>
          </dt>
          <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            <p
              className={`ml-2 flex items-baseline text-sm font-semibold ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {stat.change}
            </p>
          </dd>
        </div>
      ))}
    </div>
  );
}