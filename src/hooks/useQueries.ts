import { useState, useEffect } from 'react';
import { Query } from '../types';
import { getQueries } from '../utils/api/queries';  // Update import path

export function useQueries() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const data = await getQueries();
        setQueries(data);
      } catch (err) {
        setError('Failed to fetch queries');
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  return { queries, loading, error };
}