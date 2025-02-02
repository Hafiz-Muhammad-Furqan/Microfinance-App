import React from "react";
import {
  Calendar,
  DollarSign,
  User,
  MapPin,
  FileText,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Modal from "./Modal";

const ApplicationDetailsModal = ({
  application,
  isOpen,
  onClose,
  onApprove,
  onReject,
}) => {
  if (!application) return null;

  const renderSection = (title, content) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="bg-gray-50 p-4 rounded-lg">{content}</div>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6 max-h-[80vh] overflow-y-auto scrollbar-hide">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Loan Application Details
          </h2>
          <p className="text-gray-600">Application #{application._id}</p>
        </div>

        {renderSection(
          "Applicant Information",
          <div className="space-y-3">
            <div className="flex items-center">
              <User className="w-5 h-5 text-gray-400 mr-2" />
              <div>
                <p className="font-medium">Name</p>
                <p className="text-gray-600">{application.user.fullname}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FileText className="w-5 h-5 text-gray-400 mr-2" />
              <div>
                <p className="font-medium">CNIC</p>
                <p className="text-gray-600">{application.user.cnic}</p>
              </div>
            </div>
          </div>
        )}

        {renderSection(
          "Loan Details",
          <div className="space-y-3">
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 text-gray-400 mr-2" />
              <div>
                <p className="font-medium">Amount</p>
                <p className="text-gray-600">
                  PKR {application.loanAmount.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <FileText className="w-5 h-5 text-gray-400 mr-2" />
              <div>
                <p className="font-medium">Type</p>
                <p className="text-gray-600">
                  {application.loanCategory} - {application.subCategory}
                </p>
              </div>
            </div>
          </div>
        )}

        {renderSection(
          "Guarantors",
          application.guarantors?.length ? (
            <div className="space-y-4">
              {application.guarantors.map((guarantor, index) => (
                <div key={index} className="p-3 bg-white rounded-lg border">
                  <h4 className="font-medium mb-2">Guarantor {index + 1}</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Name:</span>{" "}
                      {guarantor.name}
                    </p>
                    <p>
                      <span className="font-medium">CNIC:</span>{" "}
                      {guarantor.cnic}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      {guarantor.email}
                    </p>
                    <p>
                      <span className="font-medium">Location:</span>{" "}
                      {guarantor.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No guarantors provided</p>
          )
        )}

        {renderSection(
          "Documents",
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Bank Statement</span>
              <a
                href={application.bankStatementUrl || "#"}
                className="text-blue-600 hover:text-blue-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Document
              </a>
            </div>
            <div className="flex items-center justify-between">
              <span>Salary Slip</span>
              <a
                href={application.salarySlipUrl || "#"}
                className="text-blue-600 hover:text-blue-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Document
              </a>
            </div>
          </div>
        )}

        {application.status === "Pending" && (
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => onReject(application.id)}
              className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              <XCircle className="w-5 h-5 mr-2" />
              Reject
            </button>
            <button
              onClick={() => onApprove(application.id)}
              className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Approve
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ApplicationDetailsModal;
