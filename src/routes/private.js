import React from 'react';
import { Navigate } from "react-router-dom";
import { isAuthenticated } from '../services/auth'

const PrivateRoute = ({ children, redirectTo }) => {
  return isAuthenticated() ? children : <Navigate to={redirectTo} />;
}

export default PrivateRoute