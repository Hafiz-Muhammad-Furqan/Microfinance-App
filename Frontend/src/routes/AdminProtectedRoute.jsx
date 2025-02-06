import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const verifyAdmin = async () => {
      const token = localStorage.getItem("adminToken");
      try {
        if (token) {
          const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/admin/verify-admin`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setLoading(false);
        } else {
          navigate("/admin/login", { replace: true });
        }
      } catch (error) {
        console.error(error.message);
        navigate("/admin/login", { replace: true });
      }
    };

    verifyAdmin();
  }, []);
  return loading ? (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="loader"></div>
    </div>
  ) : (
    children
  );
};

export default AdminProtectedRoute;
