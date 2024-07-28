/* eslint-disable react/prop-types */
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../components/context/auth";
// import { useAuth } from "../context/auth";
export const ProtectedRoute = () => {
  const location = useLocation();
  const pathname = location.pathname || "/";
  const { user } = useAuth();
  
    // let user = "user";
    // let user = null;

  if (!user) {
    // user is not authenticated
    return <Navigate to="/landing-signin" state={{ pathname }} />;
  }
  return <Outlet />;
};