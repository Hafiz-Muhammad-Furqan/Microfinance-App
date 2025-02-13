// import React from "react";
// import { Home, CreditCard } from "lucide-react";
// import { Link } from "react-router-dom";

// const Header = ({ token, setIsApplyModalOpen }) => {
//   return (
//     <header className="fixed top-0 w-full bg-white shadow-sm z-40">
//       <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
//         <div className="flex items-center space-x-2">
//           <CreditCard className="w-8 h-8 text-blue-600" />
//           <span className="text-xl font-bold">QuickLoan</span>
//         </div>

//         <div className="hidden md:flex items-center space-x-8">
//           <a
//             href="#"
//             className="text-gray-600 hover:text-blue-600 transition-colors"
//           >
//             <Home className="w-5 h-5 inline-block mr-1" /> Home
//           </a>
//           <a
//             href="#categories"
//             className="text-gray-600 hover:text-blue-600 transition-colors"
//           >
//             Loan Categories
//           </a>
//           <Link
//             to="/dashboard"
//             className="text-gray-600 hover:text-blue-600 transition-colors"
//           >
//             Dashboard
//           </Link>
//           <a
//             href="#"
//             className="text-gray-600 hover:text-blue-600 transition-colors"
//           >
//             Contact
//           </a>

//           {token ? (
//             <a
//               href="#categories"
//               className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all cursor-pointer"
//             >
//               Apply Now
//             </a>
//           ) : (
//             <button
//               onClick={() => setIsApplyModalOpen(true)}
//               className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all cursor-pointer"
//             >
//               Apply Now
//             </button>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;

import React, { useState } from "react";
import { Home, CreditCard, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = ({ token, setIsApplyModalOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

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
              href="#categories"
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

        <div className="md:hidden  flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-600 focus:outline-none"
          >
            <Menu className="w-8 h-5 cursor-pointer" />
          </button>
        </div>
      </nav>

      <div
        className={`fixed top-0 left-0 h-screen w-full bg-gray-200 flex flex-col items-center justify-center transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={closeMenu}
          className="absolute top-3 right-3 text-gray-600"
        >
          <X className="w-7 h-7 cursor-pointer" />
        </button>
        <nav className="flex flex-col space-y-6 text-center text-lg font-semibold">
          <a
            href="#"
            onClick={closeMenu}
            className="text-gray-800 hover:text-blue-600 transition-colors"
          >
            Home
          </a>
          <a
            href="#categories"
            onClick={closeMenu}
            className="text-gray-800 hover:text-blue-600 transition-colors"
          >
            Loan Categories
          </a>
          <Link
            to="/dashboard"
            onClick={closeMenu}
            className="text-gray-800 hover:text-blue-600 transition-colors"
          >
            Dashboard
          </Link>
          <a
            href="#"
            onClick={closeMenu}
            className="text-gray-800 hover:text-blue-600 transition-colors"
          >
            Contact
          </a>
          {token ? (
            <a
              href="#categories"
              onClick={closeMenu}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all cursor-pointer"
            >
              Apply Now
            </a>
          ) : (
            <button
              onClick={() => {
                setIsApplyModalOpen(true);
                closeMenu();
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all cursor-pointer"
            >
              Apply Now
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
