import React from "react";
import { Lock, User } from "lucide-react";

const LoginModal = ({
  loginForm,
  onFormChange,
  onSubmit,
  loading,
  setIsApplyModalOpen,
  setIsLoginModalOpen,
}) => {
  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
        <p className="text-gray-600">Please login to continue</p>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Enter your Email"
              className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={loginForm.email}
              onChange={(e) =>
                onFormChange({ ...loginForm, email: e.target.value })
              }
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
              placeholder="Enter your password"
              className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={loginForm.password}
              onChange={(e) =>
                onFormChange({ ...loginForm, password: e.target.value })
              }
              required
            />
          </div>
        </div>
        <div>
          <p className="font-medium">
            Dont have an Account?{"  "}
            <span
              className="text-blue-700 underline cursor-pointer"
              onClick={() => {
                setIsLoginModalOpen(false);
                setIsApplyModalOpen(true);
              }}
            >
              Sign up
            </span>
          </p>
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out cursor-pointer"
          disabled={loading}
        >
          {loading ? <div className="loader"></div> : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginModal;
