import type { Query } from '../../types';

const mockQueries: Query[] = [
  {
    id: '1',
    patientId: 'p1',
    title: 'Post-surgery Recovery Question',
    description: 'What precautions should I take after knee surgery?',
    status: 'pending',
    createdAt: '2024-03-15T10:00:00Z',
  },
  {
    id: '2',
    patientId: 'p2',
    title: 'Medication Side Effects',
    description: 'Experiencing dizziness with new medication',
    status: 'resolved',
    createdAt: '2024-03-14T15:30:00Z',
    response: 'Please schedule an appointment to discuss medication adjustment.',
  },
];

export const getQueries = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockQueries;
};