import React, { useState } from "react";
import { Calendar, Clock, MapPin, FileText, User } from "lucide-react";
import Modal from "./Modal";

const AppointmentModal = ({ application, isOpen, onClose, onSchedule }) => {
  const [appointmentData, setAppointmentData] = useState({
    date: "",
    time: "",
    location: "",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSchedule({
      applicationId: application.id,
      ...appointmentData,
    });
    onClose();
  };

  // if (!application) return null;

  // Get tomorrow's date as minimum date for appointment
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Schedule Appointment
          </h2>
          <p className="text-gray-600">Application #application.id</p>
        </div>

        <div className="mb-6 bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <User className="w-5 h-5 text-blue-600 mr-2" />
            <span className="font-medium">application.applicantName</span>
          </div>
          <div className="flex items-center">
            <FileText className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-gray-600">
              Loan Amount: PKR application.amount.toLocaleString
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Appointment Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                min={minDate}
                className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={appointmentData.date}
                onChange={(e) =>
                  setAppointmentData({
                    ...appointmentData,
                    date: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Appointment Time
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={appointmentData.time}
                onChange={(e) =>
                  setAppointmentData({
                    ...appointmentData,
                    time: e.target.value,
                  })
                }
                required
              >
                <option value="">Select Time</option>
                {Array.from({ length: 8 }, (_, i) => i + 9).map((hour) => (
                  <React.Fragment key={hour}>
                    <option value={`${hour}:00`}>{`${hour}:00 AM`}</option>
                    <option value={`${hour}:30`}>{`${hour}:30 AM`}</option>
                  </React.Fragment>
                ))}
                {Array.from({ length: 4 }, (_, i) => i + 2).map((hour) => (
                  <React.Fragment key={hour}>
                    <option value={`${hour}:00`}>{`${hour}:00 PM`}</option>
                    <option value={`${hour}:30`}>{`${hour}:30 PM`}</option>
                  </React.Fragment>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <textarea
                className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={appointmentData.location}
                onChange={(e) =>
                  setAppointmentData({
                    ...appointmentData,
                    location: e.target.value,
                  })
                }
                placeholder="Enter meeting location details"
                rows={3}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <textarea
                className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={appointmentData.notes}
                onChange={(e) =>
                  setAppointmentData({
                    ...appointmentData,
                    notes: e.target.value,
                  })
                }
                placeholder="Any additional instructions or notes for the applicant"
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Schedule Appointment
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AppointmentModal;
