import React, { useEffect, useState } from "react";
import { Filter, Search } from "lucide-react";
import ApplicationsTable from "../components/ApplicationsTable";
import ApplicationDetailsModal from "../components/ApplicationDetailsModal";
import FilterPanel from "../components/FilterPanel";
import axios from "axios";
import showToast from "../utils/Toast";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);

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
      } catch (error) {
        showToast(
          "error",
          error?.response?.data?.message || "Error Fetching Requests"
        );
      } finally {
        setLoading(false);
      }
    };
    getApplications();
  }, []);

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [filters, setFilters] = useState({
    loanCategory: "",
    status: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setIsDetailsModalOpen(true);
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.user.cnic.includes(searchQuery);

    const matchesLoanCategory =
      !filters.loanCategory || app.loanCategory === filters.loanCategory;

    const matchesStatus = !filters.status || app.status === filters.status;

    return matchesSearch && matchesLoanCategory && matchesStatus;
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
            className="flex items-center px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-50 cursor-pointer"
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
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
