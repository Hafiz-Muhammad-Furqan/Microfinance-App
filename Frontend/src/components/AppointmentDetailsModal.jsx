import React from "react";
import {
  Calendar,
  DollarSign,
  User,
  CheckCircle,
  AlertCircle,
  FileText,
  Timer,
  Clock,
  CalendarClock,
  LocateIcon,
  MapPin,
} from "lucide-react";
import Modal from "./Modal";

const AppointmentDetailsModal = ({ loan, isOpen, onClose }) => {
  if (!loan) return null;

  const StatusIcon = loan.status === "Accepted" ? CheckCircle : AlertCircle;

  const renderSection = (title, content) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="bg-gray-50 p-4 rounded-lg">{content}</div>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        <div className="text-center mb-6">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
              loan.status === "Accepted" ? "bg-green-100" : "bg-yellow-100"
            }`}
          >
            <StatusIcon
              className={`w-8 h-8 ${
                loan.status === "Accepted"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Appointment Details
          </h2>
          <p className="text-gray-600">Application #{loan._id}</p>
        </div>

        {renderSection(
          "Appointment Information",
          loan.status === "Pending" ? (
            <p className="text-center text-xl font-medium text-red-500">
              Loan request pending. Appointment will be available after
              approval.
            </p>
          ) : loan.status === "Rejected" ? (
            <p className="text-center text-xl font-medium text-red-500">
              Loan request rejected. No appointment available.
            </p>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center">
                <CalendarClock className="w-5 h-5 text-gray-400 mr-2" />
                <div>
                  <p className="font-medium">Appointment Date</p>
                  <p className="text-gray-600">
                    {loan?.appointmentDate?.split("T")[0]}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-gray-400 mr-2" />
                <div>
                  <p className="font-medium">Appointment Time</p>
                  <p className="text-gray-600">{loan?.appointmentTime}</p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                <div>
                  <p className="font-medium">Appointment Location</p>
                  <p className="text-gray-600">{loan?.appointmentLocation}</p>
                </div>
              </div>
            </div>
          )
        )}

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AppointmentDetailsModal;
