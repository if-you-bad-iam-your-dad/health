import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import PatientDashboard from "../pages/patient/PatientDashboard";
import PatientManagement from "../pages/doctor/PatientManagement";
import AppointmentList from "../pages/doctor/AppointmentList";
import Treatments from "../pages/Treatments";
import Queries from "../pages/Queries";
import Settings from "../pages/Settings";
import { UnauthorizedPage, NotFoundPage } from "../pages/error";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import { useAuth } from "../contexts/AuthContext";

const DashboardComponent = () => {
  const { user } = useAuth();
  return user?.role === "admin" ? <DoctorDashboard /> : <PatientDashboard />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <DashboardComponent />,
      },
      // Admin/Doctor Routes
      {
        path: "patients",
        element: (
          <ProtectedRoute requiredRole="admin">
            <PatientManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "appointments",
        element: (
          <ProtectedRoute requiredRole="admin">
            <AppointmentList />
          </ProtectedRoute>
        ),
      },
      {
        path: "analytics",
        element: (
          <ProtectedRoute requiredRole="admin">
            <div>Analytics Dashboard</div>
          </ProtectedRoute>
        ),
      },
      {
        path: "reports",
        element: (
          <ProtectedRoute requiredRole="admin">
            <div>Reports Dashboard</div>
          </ProtectedRoute>
        ),
      },
      // Patient Routes
      {
        path: "treatments",
        element: (
          <ProtectedRoute requiredRole="patient">
            <Treatments />
          </ProtectedRoute>
        ),
      },
      {
        path: "queries",
        element: <Queries />,
      },
      // Common Routes
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);
