import React, { useState, createContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage"; // Student Dashboard
import AdminPage from "./pages/AdminPage";
import ManagerPage from "./pages/ManagerPage";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./components/common/Layout";

// Simple Authentication Simulation Context
export const AuthContext = createContext(null);

function App() {
  // --- Authentication Simulation ---
  // In a real app, this would involve checking tokens, context, etc.
  const [userRole, setUserRole] = useState(null); // null, 'student', 'admin', 'manager'
  const [user, setUser] = useState(null); // Store basic user info after login

  const login = (email, role, userData) => {
    // Simulate successful login
    console.log(`Simulating login for ${email} as ${role}`);
    setUserRole(role);
    setUser(userData); // Store user details
  };

  const logout = () => {
    console.log("Simulating logout");
    setUserRole(null);
    setUser(null);
  };
  // --- End Authentication Simulation ---

  // Protected Route Component
  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!userRole || !allowedRoles.includes(userRole)) {
      // Redirect to login if not logged in or role not allowed
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <AuthContext.Provider value={{ userRole, user, login, logout }}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Layout>
                <DashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Layout>
                <AdminPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/approvals" // Example sub-route
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Layout>
                {/* You'd render a specific approval component here */}
                <div className="p-6">
                  Profile Change Approval Page (Admin) - Placeholder
                </div>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <Layout>
                <ManagerPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Catch-all for Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
