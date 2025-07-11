import React from "react";
import Register from "../../components/organisms/auth/Register";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function RegisterPage() {
  return (
    <div className="lg:overflow-hidden min-h-screen">
      <div className="flex flex-col lg:flex-row h-screen -translate-y-2 bg-white">
        <div className="hidden lg:block w-full md:w-1/2 relative min-h-[300px] md:min-h-full">
          <div className="absolute inset-9 bg-secondary rounded-b-full mx-8 lg:mx-16 -my-7 left-4 lg:left-20" />
          <div className="absolute inset-1 bg-primary rounded-b-full mx-16 lg:mx-32 my-1 flex flex-col items-center justify-center p-4 text-center">
            <LazyLoadImage
              src="/images/auth/register.png"
              alt="Tahu Suzuka"
              className="w-40 h-40 lg:w-64 lg:h-64 object-contain mb-4"
              effect="blur"
            />
            <h2 className="lg:text-3xl text-2xl font-bebas font-bold text-white">
              Buat Akun Baru
            </h2>
          </div>
        </div>
        {/* Right */}
        <Register />
      </div>
    </div>
  );
}
