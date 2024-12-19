import React from 'react';
import { useForm } from '../../hooks/useForm';
import { Input, Button } from '../common';
import { DOCTOR_VALIDATION, DoctorRegistrationData } from '../../utils/validation/doctorValidation';

export default function DoctorRegistrationForm() {
  const { values, errors, handleChange, handleSubmit } = useForm<DoctorRegistrationData>({
    initialValues: {
      licenseNumber: '',
      specialization: '',
      experience: 0,
      hospital: '',
      clinic: ''
    },
    onSubmit: async (data) => {
      console.log('Doctor registration data:', data);
      // Handle submission
    }
  });

  return (
    <div className="space-y-6">
      <Input
        label="Medical License Number"
        id="licenseNumber"
        name="licenseNumber"
        value={values.licenseNumber}
        onChange={handleChange}
        error={errors.licenseNumber}
        placeholder="XX123456"
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Specialization
        </label>
        <select
          name="specialization"
          value={values.specialization}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        >
          <option value="">Select Specialization</option>
          {DOCTOR_VALIDATION.specialization.map(spec => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>
        {errors.specialization && (
          <p className="mt-1 text-sm text-red-600">{errors.specialization}</p>
        )}
      </div>

      <Input
        label="Years of Experience"
        type="number"
        id="experience"
        name="experience"
        value={values.experience}
        onChange={handleChange}
        error={errors.experience}
        min={DOCTOR_VALIDATION.minExperience}
        required
      />

      <Input
        label="Hospital Name (if applicable)"
        id="hospital"
        name="hospital"
        value={values.hospital}
        onChange={handleChange}
        error={errors.hospital}
        placeholder="Enter hospital name"
      />

      <Input
        label="Clinic Name (if applicable)"
        id="clinic"
        name="clinic"
        value={values.clinic}
        onChange={handleChange}
        error={errors.clinic}
        placeholder="Enter clinic name"
      />

      <Button type="submit" className="w-full">
        Register as Doctor
      </Button>
    </div>
  );
}