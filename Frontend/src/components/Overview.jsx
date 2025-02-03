import React from "react";
import { CreditCard, Clock, CheckCircle, XCircle } from "lucide-react";

const Overview = ({ loanStats }) => {
  const stats = [
    {
      title: "Total Applications",
      value: loanStats.total || 0,
      icon: CreditCard,
      color: "blue",
    },
    {
      title: "Pending",
      value: loanStats.pending || 0,
      icon: Clock,
      color: "yellow",
    },
    {
      title: "Approved",
      value: loanStats.accepted || 0,
      icon: CheckCircle,
      color: "green",
    },
    {
      title: "Rejected",
      value: loanStats.rejected || 0,
      icon: XCircle,
      color: "red",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className="bg-white cursor-pointer p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                <Icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <span className="text-3xl font-bold">{stat.value}</span>
            </div>
            <h3 className="text-gray-600 font-medium">{stat.title}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Overview;
