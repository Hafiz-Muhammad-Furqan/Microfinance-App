import React, { useState, useEffect } from "react";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRouteWrapper = ({ children }) => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/", { replace: true });
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/user/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error(
          "Error fetching profile:",
          error?.response?.data?.message
        );
        navigate("/", { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    getProfile();
  }, [navigate, setUser]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRouteWrapper;
