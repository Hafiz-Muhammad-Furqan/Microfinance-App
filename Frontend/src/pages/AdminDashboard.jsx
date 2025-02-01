import React, { useEffect, useState } from "react";
import { Filter, Search } from "lucide-react";
import ApplicationsTable from "../components/ApplicationsTable";
import ApplicationDetailsModal from "../components/ApplicationDetailsModal";
import FilterPanel from "../components/FilterPanel";
import axios from "axios";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([
    {
      id: 1,
      applicantName: "imran Khan",
      cnic: "42201-1234567-8",
      loanType: "Business",
      subtype: "Startup",
      amount: 500000,
      city: "Karachi",
      status: "Pending",
      submittedAt: "2024-03-01",
      guarantors: [
        {
          name: "Imran Ali",
          cnic: "42201-7654321-8",
          email: "imran@example.com",
          location: "Karachi",
        },
        {
          name: "Zainab Ahmed",
          cnic: "42201-8765432-1",
          email: "zainab@example.com",
          location: "Lahore",
        },
      ],
      documents: {
        bankStatement: "statement.pdf",
        salarySlip: "salary.pdf",
      },
    },
    {
      id: 2,
      applicantName: "Ahmed Khan",
      cnic: "42301-1234567-8",
      loanType: "Business",
      subtype: "Startup",
      amount: 500000,
      city: "Karachi",
      status: "Pending",
      submittedAt: "2024-03-01",
      guarantors: [
        {
          name: "Imran Ali",
          cnic: "42201-7654321-8",
          email: "imran@example.com",
          location: "Karachi",
        },
        {
          name: "Zainab Ahmed",
          cnic: "42201-8765432-1",
          email: "zainab@example.com",
          location: "Lahore",
        },
      ],
      documents: {
        bankStatement: "statement.pdf",
        salarySlip: "salary.pdf",
      },
    },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const getApplications = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/admin/loan-requests`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setApplications(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    };
    getApplications();
  }, []);

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [filters, setFilters] = useState({
    city: "",
    loanType: "",
    status: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setIsDetailsModalOpen(true);
  };

  // const handleApprove = async (applicationId) => {
  //   // Generate appointment date (next working day)
  //   const appointmentDate = new Date();
  //   appointmentDate.setDate(appointmentDate.getDate() + 1);
  //   while (appointmentDate.getDay() === 0 || appointmentDate.getDay() === 6) {
  //     appointmentDate.setDate(appointmentDate.getDate() + 1);
  //   }

  //   setApplications(
  //     applications.map((app) => {
  //       if (app.id === applicationId) {
  //         return {
  //           ...app,
  //           status: "Approved",
  //           appointmentDate: appointmentDate.toISOString().split("T")[0],
  //         };
  //       }
  //       return app;
  //     })
  //   );

  //   // Close modal after approval
  //   setIsDetailsModalOpen(false);
  //   setSelectedApplication(null);
  // };

  const handleAccept = async (loanId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/admin/loan-accept`
    );
  };

  const handleReject = async (applicationId) => {
    setApplications(
      applications.map((app) => {
        if (app.id === applicationId) {
          return {
            ...app,
            status: "Rejected",
          };
        }
        return app;
      })
    );

    // Close modal after rejection
    setIsDetailsModalOpen(false);
    setSelectedApplication(null);
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.cnic.includes(searchQuery);
    const matchesCity = !filters.city || app.city === filters.city;
    const matchesLoanType =
      !filters.loanType || app.loanType === filters.loanType;
    const matchesStatus = !filters.status || app.status === filters.status;

    return matchesSearch && matchesCity && matchesLoanType && matchesStatus;
  });

  return loading ? (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="loader"></div>
    </div>
  ) : (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            className="flex items-center px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-50"
          >
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or CNIC"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {isFilterPanelOpen && (
          <FilterPanel
            filters={filters}
            onFilterChange={setFilters}
            applications={applications}
          />
        )}

        <ApplicationsTable
          applications={filteredApplications}
          onViewDetails={handleViewApplication}
        />

        <ApplicationDetailsModal
          application={selectedApplication}
          isOpen={isDetailsModalOpen}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedApplication(null);
          }}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
