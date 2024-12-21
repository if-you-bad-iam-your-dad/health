import React from "react";
import {
  Calendar,
  MessageSquare,
  Clock,
  Pill,
  Activity,
  Heart,
} from "lucide-react";

const stats = [
  {
    name: "Upcoming Appointments",
    value: "2",
    icon: Calendar,
    color: "text-blue-500",
  },
  {
    name: "Unread Messages",
    value: "3",
    icon: MessageSquare,
    color: "text-green-500",
  },
  {
    name: "Latest Blood Pressure",
    value: "120/80",
    icon: Heart,
    color: "text-red-500",
  },
  {
    name: "Active Prescriptions",
    value: "4",
    icon: Pill,
    color: "text-purple-500",
  },
];

export default function PatientDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Welcome Back, John
      </h1>
      <p className="mt-2 text-gray-600">Here's your health summary</p>

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
    </div>
  );
}
