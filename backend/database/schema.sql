CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('doctor', 'patient') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert test doctor user
INSERT INTO users (id, email, password, role) VALUES
('test-doctor', 'doctor@example.com', '$2b$10$YourHashedPasswordHere', 'doctor');

-- Insert test patient user
INSERT INTO users (id, email, password, role) VALUES
('test-patient', 'patient@example.com', '$2b$10$YourHashedPasswordHere', 'patient');
