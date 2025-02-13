import React, { useState, useEffect } from "react";
import { Calculator } from "lucide-react";
import showToast from "../utils/Toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoanCalculator = ({ loanCategory, setIsApplyModalOpen }) => {
  const [loanAmount, setLoanAmount] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [initialAmount, setInitialAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [emi, setEmi] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const categories = {
    Wedding: ["Venue", "Jewelry", "Clothing"],
    Home: ["Construction", "Renovation", "Furniture"],
    Business: ["Startup", "Expansion", "Equipment"],
    Education: ["School", "College", "University"],
  };

  useEffect(() => {
    const loanRemaining = Math.max(loanAmount - initialAmount);
    console.log(duration);

    const months = duration * 12;
    console.log(months);

    if (loanRemaining > 0 && months > 0) {
      setEmi(Math.round(loanRemaining / months));
    } else {
      setEmi(0);
    }
  }, [loanAmount, initialAmount, duration]);

  const LoanRequest = async () => {
    if (!loanAmount || !initialAmount || !duration || !subCategory) {
      return showToast("error", "Please fill all fields.");
    }

    const token = localStorage.getItem("token");

    try {
      if (token) {
        setLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/loan/loan-request`,
          {
            loanCategory,
            subCategory,
            loanAmount,
            initialAmount,
            duration,
            emi,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setLoading(false);
        showToast("success", "Loan request submitted successfully!");
        navigate("/dashboard");
      } else {
        setIsApplyModalOpen(true);
      }
    } catch (error) {
      showToast(
        "error",
        error?.response?.data?.message || "Something went wrong"
      );
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-4 bg-gray-100" id="calculator">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-center mb-6">
            <Calculator className="w-8 h-8 text-blue-600 mr-2 hidden md:block" />
            <h2 className="md:text-3xl text-2xl font-bold text-center">
              Loan Calculator
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">
                Loan Sub Category
              </label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
              >
                <option value="">Select a sub-category</option>
                {categories[loanCategory]?.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Loan Amount (PKR)
              </label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Initial Amount (PKR)
              </label>
              <input
                type="number"
                value={initialAmount}
                onChange={(e) => setInitialAmount(Number(e.target.value))}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Duration (Months)
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
              >
                <option value="">Select Duration</option>
                <option value="1">1 Year</option>
                <option value="2">2 Years</option>
                <option value="3">3 Years</option>
                <option value="4">4 Years</option>
                <option value="5">5 Years</option>
              </select>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Monthly Installment:</h4>
              <p className="text-2xl font-bold text-blue-600">
                PKR {emi.toLocaleString()}
              </p>
            </div>

            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center cursor-pointer"
              onClick={LoanRequest}
              disabled={loading}
            >
              {loading ? <div className="loader"></div> : "Apply for Loan"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanCalculator;
