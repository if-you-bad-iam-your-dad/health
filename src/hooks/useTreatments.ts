import { useState, useEffect } from 'react';
import { Treatment } from '../types';
import { getTreatments } from '../utils/api/treatments';  // Update import path

export function useTreatments() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const data = await getTreatments();
        setTreatments(data);
      } catch (err) {
        setError('Failed to fetch treatments');
      } finally {
        setLoading(false);
      }
    };

    fetchTreatments();
  }, []);

  return { treatments, loading, error };
}