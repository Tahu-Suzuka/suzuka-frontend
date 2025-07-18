import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserService } from "../services/UserService";

const ProtectedRoute = ({ children }) => {
  const [isAllowed, setIsAllowed] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      try {
        const profile = await UserService.getProfile();
        if (profile.role === "admin") {
          setIsAllowed(true);
        } else {
          setIsAllowed(false);
        }
      } catch (error) {
        setIsAllowed(false);
      } finally {
        setLoading(false);
      }
    };

    checkRole();
  }, []);

  if (loading) return <div>Loading...</div>;

  return isAllowed ? children : <Navigate to="/403" replace />;
};

export default ProtectedRoute;
