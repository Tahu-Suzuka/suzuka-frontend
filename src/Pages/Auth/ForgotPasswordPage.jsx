import React from "react";
import ForgotPassword from "../../components/organisms/auth/ForgotPassword";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ForgotPasswordPage = () => {
  return (
    <div className="lg:overflow-hidden min-h-screen ">
      <div className="flex flex-col md:flex-row h-screen -translate-y-2 bg-white">
        {/* Right */}
        <div className="hidden md:block md:w-1/2 relative">
          <div className="absolute inset-9 bg-secondary rounded-b-full mx-16 -my-7 left-20"></div>
          <div className="absolute inset-1 bg-primary rounded-b-full mx-32 my-1 flex flex-col items-center justify-center ">
            <h1 className="text-2xl lg:text-3xl text-center tracking-wide mb-8 text-white font-bold">
              Lupa Kata Sandi
            </h1>
            <LazyLoadImage
              src="/images/auth/forgot-password.png"
              alt="Tahu Suzuka"
              className="w-64 h-64 object-contain mb-4"
              effect="blur"
            />
          </div>
        </div>
        {/* Left  */}
        <ForgotPassword />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
