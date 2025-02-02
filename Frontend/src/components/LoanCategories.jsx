import React from "react";
import {
  Briefcase,
  GraduationCap,
  Car,
  Home as HomeIcon,
  Handshake,
} from "lucide-react";

const LoanCategories = ({ setLoanCategory }) => {
  const categories = [
    {
      id: "Business",
      title: "Business Startup Loan",
      icon: <Briefcase className="w-12 h-12 mb-4 text-blue-600" />,
      description: "Start your dream business with our interest-free financing",
    },
    {
      id: "Education",
      title: "Education Loan",
      icon: <GraduationCap className="w-12 h-12 mb-4 text-blue-600" />,
      description: "Invest in your future through quality education",
    },
    {
      id: "Wedding",
      title: "Wedding",
      icon: <Handshake className="w-12 h-12 mb-4 text-blue-600" />,
      description: "Get your dream vehicle with easy monthly installments",
    },
    {
      id: "Home",
      title: "Home Improvement",
      icon: <HomeIcon className="w-12 h-12 mb-4 text-blue-600" />,
      description: "Renovate and improve your living space",
    },
  ];

  return (
    <section id="categories" className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Loan Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow h-full"
            >
              <div className="text-center flex items-center justify-between flex-col h-full">
                {category.icon}
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <button
                  onClick={() => setLoanCategory(category.id)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
                >
                  <a href="#calculator">Apply</a>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoanCategories;
