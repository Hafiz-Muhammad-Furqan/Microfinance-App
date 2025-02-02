import React from "react";

const Hero = ({ token, setIsApplyModalOpen }) => {
  return (
    <section className="pt-24 pb-12 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Empowering Financial Stability Through Qarze Hasana
        </h1>
        <p className="text-xl mb-8 text-blue-100">
          Apply for interest-free loans and secure your future today.
        </p>
        {token ? (
          <a
            href="#calculator"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-all cursor-pointer"
          >
            Apply Now
          </a>
        ) : (
          <button
            onClick={() => setIsApplyModalOpen(true)}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-all cursor-pointer"
          >
            Apply Now
          </button>
        )}
      </div>
    </section>
  );
};

export default Hero;
