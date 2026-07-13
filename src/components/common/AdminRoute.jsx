// src/components/common/AdminRoute.jsx

import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const AdminRoute = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Loading Screen
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // User not logged in
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // Admin Check
  const isAdminUser =
    user?.role === "admin" ||
    user?.role === "ADMIN" ||
    user?.isAdmin === true;

  if (!isAdminUser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;