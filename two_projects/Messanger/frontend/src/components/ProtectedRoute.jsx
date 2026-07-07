import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && userRole !== allowedRole) {
    // Если админ пытается зайти на обычный юзерский дашборд или наоборот
    return <Navigate to={userRole === 'admin' ? '/admin' : '/app'} replace />;
  }

  return children;
};

export default ProtectedRoute;