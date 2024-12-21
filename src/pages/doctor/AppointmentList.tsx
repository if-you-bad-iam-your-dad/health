import React from "react";
import { Calendar, Clock, User } from "lucide-react";

const appointments = [
  {
    id: "1",
    patientName: "John Doe",
    time: "09:00 AM",
    type: "Check-up",
    status: "upcoming",
  },
  {
    id: "2",
    patientName: "Jane Smith",
    time: "10:30 AM",
    type: "Follow-up",
    status: "upcoming",
  },
  // Add more appointments for better testing
  {
    id: "3",
    patientName: "Mike Johnson",
    time: "02:00 PM",
    type: "Consultation",
    status: "upcoming",
  },
  {
    id: "4",
    patientName: "Sarah Williams",
    time: "03:30 PM",
    type: "Review",
    status: "upcoming",
  },
];

export default function AppointmentList() {
  return (
    <div className="p-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-xl font-medium text-gray-900">
            Appointments Schedule
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            View and manage your appointments
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <li
              key={appointment.id}
              className="px-4 py-4 sm:px-6 hover:bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <User className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      {appointment.patientName}
                    </p>
                    <div className="flex items-center mt-1">
                      <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      <p className="text-sm text-gray-500">
                        {appointment.time}
                      </p>
                      <span className="mx-2 text-gray-500">•</span>
                      <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      <p className="text-sm text-gray-500">
                        {appointment.type}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      appointment.status === "upcoming"
                        ? "bg-green-100 text-green-800"
                        : appointment.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
