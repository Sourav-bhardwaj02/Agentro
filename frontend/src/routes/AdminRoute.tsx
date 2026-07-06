import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  // TODO: Replace with real auth check from authStore
  const isAuthenticated = true; 
  const isAdmin = true;

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
};

export default AdminRoute;
