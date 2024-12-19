import React from 'react';
import { Query } from '../../types';
import { MessageSquare, CheckCircle, Clock } from 'lucide-react';

interface QueryCardProps {
  query: Query;
  onClick: (query: Query) => void;
}

export default function QueryCard({ query, onClick }: QueryCardProps) {
  return (
    <div
      onClick={() => onClick(query)}
      className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{query.title}</h3>
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">{query.description}</p>
        </div>
        <div className="ml-4">
          {query.status === 'resolved' ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <Clock className="h-5 w-5 text-yellow-500" />
          )}
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm text-gray-500">
        <MessageSquare className="h-4 w-4 mr-1" />
        <span>
          {new Date(query.createdAt).toLocaleDateString()}
        </span>
        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
          query.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {query.status}
        </span>
      </div>
    </div>
  );
}