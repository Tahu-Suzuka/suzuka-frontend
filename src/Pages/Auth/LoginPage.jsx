import React from "react";
import Login from "../../components/organisms/auth/Login";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function LoginPage() {
  return (
    <div className="lg:overflow-hidden min-h-screen ">
      <div className="flex flex-col md:flex-row h-screen bg-white">
        <Login />

        <div className="hidden lg:block md:w-1/2 relative h-full mt-5 right-14">
          <div className="absolute inset-9 bg-secondary rounded-t-full mx-8 lg:mx-16 -my-7 left-4 lg:left-20"></div>
          <div className="absolute inset-1 bg-primary rounded-t-full mx-32 my-2 flex flex-col items-center justify-center">
            <LazyLoadImage
              src="/images/footer/footer.png"
              alt="Tahu Suzuka"
              className="w-64 h-64 object-contain mb-4"
              effect="blur"
            />
            <h2 className="text-4xl font-bebas font-bold text-white">
              Tahu Suzuka
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
