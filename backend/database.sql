CREATE DATABASE IF NOT EXISTS health_db;
USE health_db;

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('patient', 'doctor') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Patients table
CREATE TABLE IF NOT EXISTS patients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    blood_group VARCHAR(5),
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Doctors table (with admin capabilities)
CREATE TABLE IF NOT EXISTS doctors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
);

-- Sample Data with proper credentials
-- Doctors
INSERT INTO users (email, password, role) VALUES
('john.doe@hospital.com', '$2b$10$dQRZ3xAewxhGYQyKGgWxHuVDWiIq2u4RsKaXcUBP1JVthTyCJRz2e', 'doctor'), -- password: doctor123
('sarah.smith@hospital.com', '$2b$10$KJE4q9mQZK3A7NVb5j1vR.1q2z4l3E6Z3l4z4M4M4M4M4M4M4M', 'doctor'); -- password: doctor456

INSERT INTO doctors (user_id, name, department, phone) VALUES
(1, 'Dr. John Doe', 'Cardiology', '123-456-7890'),
(2, 'Dr. Sarah Smith', 'Neurology', '123-456-7891');

-- Patients
INSERT INTO users (email, password, role) VALUES
('patient1@email.com', '$2b$10$abC123XyZ.PatientHash1SecureString', 'patient'), -- password: patient123
('patient2@email.com', '$2b$10$defGHI456.PatientHash2SecureString', 'patient'); -- password: patient456

INSERT INTO patients (user_id, name, age, blood_group, gender, phone, address) VALUES
(3, 'Alice Johnson', 30, 'O+', 'Female', '123-555-0001', '123 Main St'),
(4, 'Bob Wilson', 45, 'A+', 'Male', '123-555-0002', '456 Oak Ave');

-- Frontend Specific Queries

-- Get Patient Profile
-- SELECT p.*, u.email FROM patients p 
-- JOIN users u ON p.user_id = u.id 
-- WHERE u.id = ?;

-- Get Doctor Profile
-- SELECT d.*, u.email FROM doctors d 
-- JOIN users u ON d.user_id = u.id 
-- WHERE u.id = ?;

-- Get All Appointments for Patient
-- SELECT a.*, d.name as doctor_name, d.department 
-- FROM appointments a
-- JOIN doctors d ON a.doctor_id = d.id
-- WHERE a.patient_id = ?;

-- Get All Appointments for Doctor
-- SELECT a.*, p.name as patient_name, p.age, p.blood_group
-- FROM appointments a
-- JOIN patients p ON a.patient_id = p.id
-- WHERE a.doctor_id = ?;

-- Get Available Time Slots
-- SELECT time FROM appointments 
-- WHERE doctor_id = ? AND date = ? AND status != 'cancelled';

-- Get Appointment Details
-- SELECT a.*, d.name as doctor_name, d.department, p.name as patient_name, p.age, p.blood_group
-- FROM appointments a
-- JOIN doctors d ON a.doctor_id = d.id
-- JOIN patients p ON a.patient_id = p.id
-- WHERE a.id = ?;

-- Authentication Query
-- SELECT u.*, 
--   CASE 
--     WHEN u.role = 'doctor' THEN (SELECT id FROM doctors WHERE user_id = u.id)
--     WHEN u.role = 'patient' THEN (SELECT id FROM patients WHERE user_id = u.id)
--   END as profile_id
-- FROM users u
-- WHERE u.email = ?;
