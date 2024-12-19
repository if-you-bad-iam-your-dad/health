export interface Doctor {
  id: string;
  userId: string;
  licenseNumber: string;
  specialization: string;
  experience: number;
  hospital?: string;
  clinic?: string;
  rating?: number;
  totalPatients?: number;
  availableSlots?: {
    day: string;
    times: string[];
  }[];
}

export interface DoctorProfile extends Doctor {
  name: string;
  email: string;
  phone?: string;
  profileImage?: string;
}