import React from "react";
import { ImCancelCircle } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button";
const SecurityFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-grow flex items-center justify-center pt-16 p-6">
      <div className="bg-white p-10 rounded-2xl shadow-md text-center max-w-lg w-full">
        <ImCancelCircle className="text-5xl lg:text-7xl text-primary mx-auto mb-4" />
        <h1 className="text-xl lg:text-2xl font-bold mb-2 text-primary">
          Verifikasi Gagal
        </h1>
        <p className="text-gray-600 max-w-md mb-8 text-sm lg:text-base">
          Maaf, verifikasi akun gagal. Silakan coba lagi.
        </p>

        <Button
          text="Coba Lagi"
          onClick={() => navigate("/security-check")}
          py="py-2"
          className="rounded-full "
        />
      </div>
    </div>
  );
};

export default SecurityFailed;
