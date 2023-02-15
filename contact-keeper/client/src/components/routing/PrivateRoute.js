import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import Spinner from "../layout/Spinner";

const PrivateRoute = ({ children }) => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, loading } = authContext;

  if (loading) return <Spinner />;
  if (isAuthenticated) return children;
  return <Navigate to='/login' />;
};

export default PrivateRoute;
