import React from "react";
import { Users, Calendar, Clock, CheckSquare } from "lucide-react";
// Remove AppointmentList import

const stats = [
  {
    name: "Total Patients",
    value: "28",
    icon: Users,
    color: "text-blue-500",
  },
  {
    name: "Today's Appointments",
    value: "8",
    icon: Calendar,
    color: "text-green-500",
  },
  {
    name: "Pending Reports",
    value: "5",
    icon: Clock,
    color: "text-yellow-500",
  },
  {
    name: "Completed Visits",
    value: "120",
    icon: CheckSquare,
    color: "text-purple-500",
  },
];

export default function DoctorDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900">Doctor Dashboard</h1>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon
                    className={`h-6 w-6 ${stat.color}`}
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Remove AppointmentList component */}
    </div>
  );
}
