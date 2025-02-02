import { useEffect, useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import LoanCategories from "../components/LoanCategories";
import LoanCalculator from "../components/LoanCalculator";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import ApplyModal from "../components/ApplyModal";
import LoginModal from "../components/LoginModal";
import showToast from "../utils/Toast";
import axios from "axios";
import { useAuth } from "../context/UserContext";

const LandingPage = () => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loanCategory, setLoanCategory] = useState("Business");
  const [loading, setLoading] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
    cnic: "",
    email: "",
    fullname: "",
  });
  const [loginForm, setLoginForm] = useState({
    cnic: "",
    recievedPassword: "",
    newPassword: "",
  });
  const { setUser } = useAuth();

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    const { cnic, email, fullname } = applicationForm;
    if (!cnic || !email || !fullname) {
      showToast("error", "Please fill all    fields");
    }
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/signup`,
        applicationForm
      );
      setUser(response.data);
      setLoading(false);
      setIsApplyModalOpen(false);
      showToast(
        "success",
        "We've sent your password to your email. Please copy it and enter it in the 'Received Password' field."
      );
      setIsLoginModalOpen(true);
    } catch (error) {
      const errorMsg = error?.response?.data?.message || "Something went wrong";
      showToast("error", errorMsg);
      setLoading(false);
      console.log(error.message);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { cnic, newPassword, recievedPassword } = loginForm;
    if (!cnic || !newPassword || !recievedPassword) {
      showToast("error", "Please fill all fields");
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/login`,
        loginForm
      );
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      setLoading(false);
      setIsLoginModalOpen(false);
      showToast("success", "You can now submit a loan request.");
    } catch (error) {
      const errorMsg = error?.response?.data?.message || "Something went wrong";
      showToast("error", errorMsg);
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    } else {
      setToken(null);
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      >
        <ApplyModal
          applicationForm={applicationForm}
          setApplicationForm={setApplicationForm}
          onSubmit={handleApplySubmit}
          loading={loading}
        />
      </Modal>

      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      >
        <LoginModal
          loginForm={loginForm}
          onFormChange={setLoginForm}
          onSubmit={handleLoginSubmit}
          loading={loading}
        />
      </Modal>

      <Header setIsApplyModalOpen={setIsApplyModalOpen} token={token} />
      <Hero setIsApplyModalOpen={setIsApplyModalOpen} token={token} />
      <LoanCategories setLoanCategory={setLoanCategory} />
      <LoanCalculator
        loanCategory={loanCategory}
        setIsApplyModalOpen={setIsApplyModalOpen}
      />
      <Footer />
    </div>
  );
};

export default LandingPage;
