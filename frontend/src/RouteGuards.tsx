import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

interface RouteGuardProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: RouteGuardProps) => {
  const { token } = useAuth();
  
  // If there is no token, navigate to the login page
  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }
  
  return <>{children}</>;
};

export const RedirectIfAuthenticated = ({ children }: RouteGuardProps) => {
  const { token } = useAuth();
  
  // If there is a token (user is logged in) redirect to Overview
  if (token) {
    return <Navigate to="/acc" replace />;
  }
  
  return <>{children}</>;
};
