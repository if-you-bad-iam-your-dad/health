export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  role: 'patient' | 'admin';
  emergencyContact?: {
    name: string;
    phone: string;
    relation: string;
  };
  language: 'en' | 'hi';
}

export interface Treatment {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface Query {
  id: string;
  patientId: string;
  title: string;
  description: string;
  status: 'pending' | 'resolved';
  createdAt: string;
  response?: string;
}