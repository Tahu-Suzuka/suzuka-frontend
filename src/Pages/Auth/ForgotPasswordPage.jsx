import React from "react";
import ForgotPassword from "../../components/organisms/auth/ForgotPassword";

const ForgotPasswordPage = () => {
  return (
    <div className="overflow-hidden min-h-screen ">
      <div className="flex flex-col md:flex-row h-screen -translate-y-2 bg-white">
        {/* Right */}
        <div className="hidden md:block md:w-1/2 relative">
          <div className="absolute inset-9 bg-secondary rounded-b-full mx-16 -my-7 left-20"></div>
          <div className="absolute inset-1 bg-primary rounded-b-full mx-32 my-1 flex flex-col items-center justify-center ">
            <img
              src="/Images/login.png"
              alt="Tahu Suzuka"
              className="w-64 h-64 object-contain mb-4"
            />
            {/* <h2 className="text-4xl font-bold text-white">Lupa Kata Sandi</h2> */}
          </div>
        </div>
        {/* Left  */}
        <ForgotPassword />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
