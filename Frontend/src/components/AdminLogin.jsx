import { Lock, User } from "lucide-react";
import React, { useState } from "react";
import showToast from "../utils/Toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      showToast("error", "Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/login`,
        {
          email,
          password,
        }
      );
      localStorage.setItem("adminToken", response.data.token);
      navigate("/admin/dashboard");
      setLoading(false);
    } catch (error) {
      showToast(
        "error",
        error?.response?.data?.message || "Something went wrong"
      );
      setLoading(false);
      console.log(error.message);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-sm">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Welcome </h2>
          <p className="text-gray-600">Please login to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Enter email (e.g., johndoe@gmail.com)"
                className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(() => e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                placeholder="Enter your  password"
                className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(() => e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out"
            disabled={loading}
          >
            {loading ? (
              <div className="loader cursor-not-allowed"></div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
