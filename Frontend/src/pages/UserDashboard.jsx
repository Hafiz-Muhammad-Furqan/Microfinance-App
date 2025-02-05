import React, { useEffect, useMemo, useState } from "react";
import Overview from "../components/Overview";
import LoanTable from "../components/LoanTable";
import showToast from "../utils/Toast";
import axios from "axios";
import LoanDetailsModal from "../components/LoanDetailsModal";
import { Link } from "react-router-dom";
import AppointmentDetailsModal from "../components/AppointmentDetailsModal";

const UserDashboard = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const loanStats = useMemo(
    () => ({
      total: loans.length,
      pending: loans.filter((loan) => loan.status.toLowerCase() === "pending")
        .length,
      accepted: loans.filter((loan) => loan.status.toLowerCase() === "accepted")
        .length,
      rejected: loans.filter((loan) => loan.status.toLowerCase() === "rejected")
        .length,
    }),
    [loans]
  );

  const handleViewDetails = (loan) => {
    setSelectedLoan(loan);
    setIsDetailsModalOpen(true);
  };
  const handleAppointmentDetails = (loan) => {
    setSelectedLoan(loan);
    setIsAppointmentModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedLoan(null);
  };

  useEffect(() => {
    const getLoanRequests = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/loan/get-loan-requests`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setLoans(response.data);
        setLoading(false);
      } catch (error) {
        showToast(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        setLoading(false);
      }
    };
    getLoanRequests();
  }, []);

  return loading ? (
    <div className="h-[100dvh] w-full flex items-center justify-center">
      <div className="loader"></div>
    </div>
  ) : (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between mb-6 lg:mb-8 gap-4 lg:gap-0">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            User Dashboard
          </h1>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-lg  cursor-pointer font-semibold hover:bg-blue-50 transition-all">
            <Link to={"/"}> Go To Home</Link>
          </button>
        </div>
        <Overview loanStats={loanStats} />

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Loan Applications
            </h2>
            <LoanTable
              loans={loans}
              onViewDetails={handleViewDetails}
              onViewAppointment={handleAppointmentDetails}
            />
          </section>
        </div>
        <LoanDetailsModal
          loan={selectedLoan}
          isOpen={isDetailsModalOpen}
          onClose={handleCloseDetailsModal}
        />
        <AppointmentDetailsModal
          isOpen={isAppointmentModalOpen}
          onClose={() => {
            setIsAppointmentModalOpen(false);
            setSelectedLoan(null);
          }}
          loan={selectedLoan}
        />
      </div>
    </div>
  );
};

export default UserDashboard;
