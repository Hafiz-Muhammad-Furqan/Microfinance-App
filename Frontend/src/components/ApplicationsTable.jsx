import React from "react";
import { Eye, Calendar } from "lucide-react";

const ApplicationsTable = ({ applications, onViewDetails }) => {
  const StatusBadge = ({ status }) => {
    const styles = {
      Pending: "bg-yellow-100 text-yellow-800",
      Accepted: "bg-green-100 text-green-800",
      Rejected: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          styles[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Applicant
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Loan Details
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {applications.length === 0 ? (
            <tr className="text-center">
              <td colSpan="3" className="py-6 font-semibold lg:text-2xl">
                No applications available. Check back later!"
              </td>
            </tr>
          ) : (
            applications.map((application) => (
              <tr key={application._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {application.user.fullname}
                  </div>
                  <div className="text-sm text-gray-500">
                    {application.user.cnic}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {application.loanCategory} - {application.subCategory}
                  </div>
                  <div className="text-sm text-gray-500">
                    PKR {application.loanAmount.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={application.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onViewDetails(application)}
                    className="text-blue-600 hover:text-blue-900 flex items-center cursor-pointer"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsTable;
