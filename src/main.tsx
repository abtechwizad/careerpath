import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Login from "./login";
import Signup from "./Signup";
import CertificatePage from "./components/CertificatePage";
import "./index.css";

// Simple Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Simple redirection wrapper for Login and Signup
// In true routing, we don't need onSwitchToSignup props, we can just navigate.
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route 
        path="/app" 
        element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/certificate" 
        element={
          <ProtectedRoute>
            <CertificatePage />
          </ProtectedRoute>
        } 
      />
      {/* Root redirects to app or login via ProtectedRoute */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        } 
      />
    </Routes>
  </BrowserRouter>
);
  