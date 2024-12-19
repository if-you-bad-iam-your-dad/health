import React from "react";
import { Treatment } from "../../types";

interface TreatmentCardProps {
  treatment: Treatment;
  onSelect: (treatment: Treatment) => void;
}

export default function TreatmentCard({
  treatment,
  onSelect,
}: TreatmentCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={treatment.imageUrl}
        alt={treatment.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {treatment.name}
        </h3>
        <p className="mt-2 text-sm text-gray-600">{treatment.description}</p>
        <button
          onClick={() => onSelect(treatment)}
          className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Learn More
        </button>
      </div>
    </div>
  );
}
