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
    <div className="bg-white p-2 lg:p-4 rounded-lg shadow mb-6 w-full flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <div>
          <label className="block text-md font-medium text-gray-700 mb-1">
            Loan Category
          </label>
          <select
            value={filters.loanCategory || ""}
            onChange={(e) =>
              onFilterChange({ ...filters, loanCategory: e.target.value })
            }
            className="w-full px-2  py-1 border rounded-md  cursor-pointer"
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
          <label className="block text-md font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={filters.status || ""}
            onChange={(e) =>
              onFilterChange({ ...filters, status: e.target.value })
            }
            className="w-full px-2  py-1 border rounded-md  cursor-pointer"
          >
            <option value="">All Status</option>
            {loanStatus.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-md font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            value={filters.sortBy || ""}
            onChange={(e) =>
              onFilterChange({ ...filters, sortBy: e.target.value })
            }
            className="w-full px-2  py-1 border rounded-md  cursor-pointer"
          >
            <option value="">Default</option>
            <option value="lowToHigh">Low to High (Amount)</option>
            <option value="highToLow">High to Low (Amount)</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="aToZ">A to Z (Name)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
