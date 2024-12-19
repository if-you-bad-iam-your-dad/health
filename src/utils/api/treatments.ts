import type { Treatment } from '../../types';

const mockTreatments: Treatment[] = [
  {
    id: '1',
    name: 'Physical Therapy',
    description: 'Comprehensive physical therapy program for rehabilitation',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    name: 'Dental Care',
    description: 'Complete dental care and hygiene services',
    imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    name: 'Nutritional Counseling',
    description: 'Personalized nutrition plans and dietary guidance',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80',
  },
];

export const getTreatments = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockTreatments;
};