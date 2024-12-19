import React from "react";
import { Calendar, MessageSquare, Clock, Activity } from "lucide-react";

const stats = [];

export default function PatientDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Welcome Back</h1>

      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.length > 0 ? (
          stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon
                      className="h-6 w-6 text-gray-400"
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
          ))
        ) : (
          <p className="text-gray-500">No data available</p>
        )}
      </div>
    </div>
  );
}
