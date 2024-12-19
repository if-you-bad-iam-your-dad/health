import React from 'react';
import { MessageSquare } from 'lucide-react';

interface Query {
  id: string;
  patientName: string;
  title: string;
  date: string;
  status: 'pending' | 'answered';
}

const queries: Query[] = [
  {
    id: '1',
    patientName: 'John Doe',
    title: 'Question about medication side effects',
    date: '2024-03-15',
    status: 'pending',
  },
  {
    id: '2',
    patientName: 'Jane Smith',
    title: 'Follow-up appointment request',
    date: '2024-03-14',
    status: 'answered',
  },
];

export default function PatientQueries() {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Patient Queries</h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {queries.map((query) => (
          <li key={query.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MessageSquare className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">{query.patientName}</p>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      query.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {query.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{query.title}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}