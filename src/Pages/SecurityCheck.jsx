import React from "react";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SecurityCheck = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex-grow flex items-center justify-center pt-16">
        <div className="bg-white p-10 rounded-2xl shadow-md text-center max-w-lg w-full">
          <IoShieldCheckmarkOutline className="text-7xl text-red-500 mx-auto mb-4" />
          <p className="mb-6 text-gray-700 text-sm lg:text-base">
            Untuk keamanan akun, mohon verifikasi identitas kamu dengan salah
            satu cara di bawah ini.
          </p>

          <button
            onClick={() => navigate("/security-password")}
            className="bg-primary hover:bg-red-500 text-white font-medium py-2 px-4 rounded-full text-sm"
          >
            Verifikasi dengan Kata Sandi
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityCheck;
