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
  const [token, setToken] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loanCategory, setLoanCategory] = useState("Business");
  const [loading, setLoading] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
    email: "",
    fullname: "",
    password: "",
  });
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useAuth();

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    const { email, fullname, password } = applicationForm;
    if (!email || !fullname || !password) {
      showToast("error", "Please fill all  ields");
    }
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/signup`,
        applicationForm
      );
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      setLoading(false);
      setIsApplyModalOpen(false);
      showToast("success", "You can now submit a loan request.");
    } catch (error) {
      const errorMsg = error?.response?.data?.message || "Something went wrong";
      showToast("error", errorMsg);
      setLoading(false);
      console.log(error.message);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { password, email } = loginForm;
    if (!password || !email) {
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
      setToken(response.data.token);
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
    console.log("chala");

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
          setIsLoginModalOpen={setIsLoginModalOpen}
          setIsApplyModalOpen={setIsApplyModalOpen}
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
          setIsLoginModalOpen={setIsLoginModalOpen}
          setIsApplyModalOpen={setIsApplyModalOpen}
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
