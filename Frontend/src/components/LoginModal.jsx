import React from "react";
import { Lock, User } from "lucide-react";

const LoginModal = ({ loginForm, onFormChange, onSubmit, loading }) => {
  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
        <p className="text-gray-600">Please login to continue</p>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CNIC
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Enter CNIC (e.g., 42201-1234567-8)"
              className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={loginForm.cnic}
              onChange={(e) =>
                onFormChange({ ...loginForm, cnic: e.target.value })
              }
              pattern="^\d{5}-\d{7}-\d{1}$"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recieved Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Enter your recieved password"
              className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={loginForm.recievedPassword}
              onChange={(e) =>
                onFormChange({ ...loginForm, recievedPassword: e.target.value })
              }
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Enter your new password"
              className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={loginForm.newPassword}
              onChange={(e) =>
                onFormChange({ ...loginForm, newPassword: e.target.value })
              }
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out"
          disabled={loading}
        >
          {loading ? <div className="loader"></div> : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginModal;
