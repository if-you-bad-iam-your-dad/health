import React, { useState } from 'react';
import { useTreatments } from '../hooks/useTreatments';
import TreatmentCard from '../components/treatments/TreatmentCard';
import { Treatment } from '../types';
import { Loader } from 'lucide-react';

export default function Treatments() {
  const { treatments, loading, error } = useTreatments();
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);

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
        <h1 className="text-2xl font-semibold text-gray-900">Available Treatments</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {treatments.map((treatment) => (
          <TreatmentCard
            key={treatment.id}
            treatment={treatment}
            onSelect={setSelectedTreatment}
          />
        ))}
      </div>

      {selectedTreatment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4">{selectedTreatment.name}</h2>
            <img
              src={selectedTreatment.imageUrl}
              alt={selectedTreatment.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-600 mb-4">{selectedTreatment.description}</p>
            <button
              onClick={() => setSelectedTreatment(null)}
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