import React, { useState } from 'react';
import { useQueries } from '../hooks/useQueries';
import QueryCard from '../components/queries/QueryCard';
import { Query } from '../types';
import { Loader, Plus } from 'lucide-react';

export default function Queries() {
  const { queries, loading, error } = useQueries();
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">My Queries</h1>
        <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          <Plus className="h-5 w-5 mr-2" />
          New Query
        </button>
      </div>

      <div className="space-y-4">
        {queries.map((query) => (
          <QueryCard
            key={query.id}
            query={query}
            onClick={setSelectedQuery}
          />
        ))}
      </div>

      {selectedQuery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4">{selectedQuery.title}</h2>
            <p className="text-gray-600 mb-4">{selectedQuery.description}</p>
            {selectedQuery.response && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h3 className="font-medium text-gray-900 mb-2">Response:</h3>
                <p className="text-gray-600">{selectedQuery.response}</p>
              </div>
            )}
            <button
              onClick={() => setSelectedQuery(null)}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}