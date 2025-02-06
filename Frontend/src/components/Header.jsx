import React from "react";
import { Home, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const Header = ({ token, setIsApplyModalOpen }) => {
  return (
    <header className="fixed top-0 w-full bg-white shadow-sm z-40">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CreditCard className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-bold">QuickLoan</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Home className="w-5 h-5 inline-block mr-1" /> Home
          </a>
          <a
            href="#categories"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Loan Categories
          </a>
          <Link
            to="/dashboard"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Dashboard
          </Link>
          <a
            href="#"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Contact
          </a>

          {token ? (
            <a
              href="#calculator"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all cursor-pointer"
            >
              Apply Now
            </a>
          ) : (
            <button
              onClick={() => setIsApplyModalOpen(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all cursor-pointer"
            >
              Apply Now
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
