import React, { useState } from "react";
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
import axios from "axios";
import showToast from "../utils/Toast.js";

const ApplicationDetailsModal = ({
  application,
  isOpen,
  onClose,
  loading,
  setLoading,
}) => {
  if (!application) return null;

  const renderSection = (title, content) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="bg-gray-100 p-4  rounded-lg">{content}</div>
    </div>
  );

  const handleAccept = async (id) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/loan-accept`,
        {
          loanId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      if (response.status === 200) {
        onClose();
        showToast("success", "Loan Application Accepted Successfully!");
      } else {
        showToast("error", "Failed to accept loan application.");
      }
      setLoading(false);
    } catch (error) {
      showToast(
        "error",
        error?.response?.data?.message || "Failed to accept loan application."
      );
      setLoading(false);
    }
  };

  const handleReject = async (id) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/loan-reject`,
        {
          loanId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      if (response.status === 200) {
        onClose();
        showToast("success", "Loan Application Rejected Successfully!");
      } else {
        showToast("error", "Failed to reject loan application.");
      }
      setLoading(false);
    } catch (error) {
      showToast(
        "error",
        error?.response?.data?.message || "Failed to reject loan application."
      );
      setLoading(false);
    }
  };

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

        {application.status === "Pending" && (
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => handleReject(application._id)}
              disabled={loading}
              className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors cursor-pointer"
            >
              <XCircle className="w-5 h-5 mr-2" />
              {loading ? <div className="loader"></div> : "Reject"}
            </button>
            <button
              onClick={() => handleAccept(application._id)}
              disabled={loading}
              className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors cursor-pointer"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              {loading ? <div className="loader"></div> : "Accept"}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ApplicationDetailsModal;
