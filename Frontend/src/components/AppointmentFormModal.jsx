import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  FileText,
  User,
  DollarSign,
} from "lucide-react";
import Modal from "./Modal";
import showToast from "../utils/Toast";
import axios from "axios";

const AppointmentFormModal = ({
  application,
  isOpen,
  onClose,
  loading,
  setLoading,
}) => {
  const [appointmentData, setAppointmentData] = useState({
    date: "",
    time: "",
    location: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { date, time, location } = appointmentData;
    if (!date || !time || !location) {
      showToast("error", "Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/accept-appointment`,
        {
          loanId: application._id,
          date: appointmentData.date,
          time: appointmentData.time,
          location: appointmentData.location,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      if (response.status === 200) {
        onClose();
      }
      showToast("success", "Appointment Scheduled Successfully");
      setLoading(false);
      setAppointmentData({ date: "", time: "", location: "" });
    } catch (error) {
      console.log(error);
      showToast(
        "error",
        error?.response?.data?.message ||
          "Appointment not Schedule Please try later"
      );
    }
    onClose();
  };

  if (!application) return null;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-h-[80vh] overflow-y-auto scrollbar-hide">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Schedule Appointment
          </h2>
          <p className="text-gray-600">Application #{application._id}</p>
        </div>

        <div className="mb-6 bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center mb-2 gap-2">
            <User className="w-5 h-5 text-blue-600" />
            <span className="font-medium">{application.user.fullname}</span>
          </div>
          <div className="flex items-center gap-3">
            <DollarSign className="w-6 h-6 text-blue-600" />
            <span className="text-gray-600">PKR {application.loanAmount} </span>
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

                {Array.from({ length: 3 }, (_, i) => i + 9).map((hour) => (
                  <React.Fragment key={hour}>
                    <option value={`${hour}:00 AM`}>{`${hour}:00 AM`}</option>
                    <option value={`${hour}:30 AM`}>{`${hour}:30 AM`}</option>
                  </React.Fragment>
                ))}

                {Array.from({ length: 6 }, (_, i) => i + 12).map((hour) => (
                  <React.Fragment key={hour}>
                    <option value={`${hour === 12 ? 12 : hour - 12}:00 PM`}>
                      {`${hour === 12 ? 12 : hour - 12}:00 PM`}
                    </option>
                    <option value={`${hour === 12 ? 12 : hour - 12}:30 PM`}>
                      {`${hour === 12 ? 12 : hour - 12}:30 PM`}
                    </option>
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

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                <div className="loader"></div>
              ) : (
                " Schedule Appointment"
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AppointmentFormModal;
