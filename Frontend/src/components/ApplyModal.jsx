import { User, Mail } from "lucide-react";

const ApplyModal = ({
  applicationForm,
  setApplicationForm,
  onSubmit,
  loading,
}) => {
  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Apply for Loan</h2>
        <p className="text-gray-600">Please fill in your details to continue</p>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Enter your full name"
              className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={applicationForm.fullname}
              onChange={(e) =>
                setApplicationForm({
                  ...applicationForm,
                  fullname: e.target.value,
                })
              }
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CNIC Number
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Enter CNIC (e.g., 42201-1234567-8)"
              className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={applicationForm.cnic}
              onChange={(e) =>
                setApplicationForm({ ...applicationForm, cnic: e.target.value })
              }
              required
              pattern="^\d{5}-\d{7}-\d{1}$"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Enter your email"
              className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={applicationForm.email}
              onChange={(e) =>
                setApplicationForm({
                  ...applicationForm,
                  email: e.target.value,
                })
              }
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center cursor-pointer"
        >
          {loading ? <div className="loader"></div> : "Continue"}
        </button>
      </form>
    </div>
  );
};

export default ApplyModal;
