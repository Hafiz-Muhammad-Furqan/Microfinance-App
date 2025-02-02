import React from "react";

const FilterPanel = ({ filters, onFilterChange, applications }) => {
  const safeApplications = applications || [];

  const loanTypes = [
    ...new Set(
      safeApplications.map((app) => app?.loanCategory).filter(Boolean)
    ),
  ];
  const loanStatus = [
    ...new Set(safeApplications.map((app) => app?.status).filter(Boolean)),
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loan Category
          </label>
          <select
            value={filters.loanCategory || ""}
            onChange={(e) =>
              onFilterChange({ ...filters, loanCategory: e.target.value })
            }
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Types</option>
            {loanTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={filters.status || ""}
            onChange={(e) =>
              onFilterChange({ ...filters, status: e.target.value })
            }
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Status</option>
            {loanStatus.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
