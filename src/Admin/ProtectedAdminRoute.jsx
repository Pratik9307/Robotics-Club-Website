// src/components/core/Auth/ProtectedAdminRoute.js
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/adminLogin" />;
  }

  return children;
};

export default ProtectedAdminRoute;
