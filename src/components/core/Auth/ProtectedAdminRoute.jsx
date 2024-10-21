// src/components/core/Auth/ProtectedAdminRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    // Redirect to the admin login page if not authenticated
    return <Navigate to="/adminLogin" replace />;
  }

  return children; // Render the children (AdminPanel) if authenticated
};

export default ProtectedAdminRoute;
