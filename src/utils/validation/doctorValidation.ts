export const DOCTOR_CREDENTIALS = {
  email: 'doctor@example.com',
  password: 'Doctor123!',
  name: 'Dr. Sarah Smith',
  role: 'admin',
  licenseNumber: 'XX123456',
  specialization: 'General Medicine',
  experience: 10,
} as const;

export const validateDoctorLogin = (email: string, password: string) => {
  return (
    email === DOCTOR_CREDENTIALS.email && 
    password === DOCTOR_CREDENTIALS.password
  );
};