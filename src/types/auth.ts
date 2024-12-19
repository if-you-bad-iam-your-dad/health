export type UserRole = 'patient' | 'admin';

export interface RegisterData {
  name: string;
  email: string;
  age: number;
  password: string;
  role: UserRole;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
  token: string;
}