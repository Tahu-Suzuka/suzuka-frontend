import React from "react";
import { ImCancelCircle } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button";
const SecurityFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-grow flex items-center justify-center pt-16">
      <div className="bg-white p-10 rounded-2xl shadow-md text-center max-w-lg w-full">
        <ImCancelCircle className="text-7xl text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2 text-red-600">
          Verifikasi Gagal
        </h1>
        <p className="text-gray-600 max-w-md mb-8">
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
