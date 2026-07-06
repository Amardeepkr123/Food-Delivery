import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loader from '../components/common/Loader';

const AdminRoute = () => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has admin role - support both role and isAdmin flags
  const isAdminUser = user?.role === 'admin' || user?.isAdmin === true;
  
  if (!isAdminUser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;