import React from "react";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button";

const SecurityCheck = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="flex-grow flex items-center justify-center pt-16">
        <div className="bg-white p-10 rounded-2xl shadow-md text-center max-w-lg w-full">
          <IoShieldCheckmarkOutline className="text-7xl text-red-500 mx-auto mb-4" />
          <p className="mb-6 text-gray-700 text-sm lg:text-base">
            Untuk keamanan akun, mohon verifikasi identitas kamu dengan salah
            satu cara di bawah ini.
          </p>

          <Button
            text="Verifikasi dengan Kata Sandi"
            onClick={() => navigate("/security-password")}
            width="w-full"
            className="py-2 rounded-full shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default SecurityCheck;
