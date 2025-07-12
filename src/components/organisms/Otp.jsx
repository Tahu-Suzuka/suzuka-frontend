import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import Button from "../atoms/Button";
import { AuthService } from "../../services/AuthService";

const Otp = () => {
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      e.target.value = "";
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otp = inputRefs.current.map((ref) => ref.value).join("");

    if (otp.length !== 6) {
      alert("Kode OTP harus 6 digit.");
      return;
    }

    try {
      await AuthService.verifyOtp(email, otp);

      const res = await AuthService.login(
        email,
        localStorage.getItem("temp_password")
      );
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/profile");
    } catch (error) {
      alert(error.response?.data?.message || "Gagal verifikasi atau login.");
    }
  };

  const handleResendOtp = async () => {
    try {
      await AuthService.resendOtp(email);
      alert("Kode OTP baru telah dikirim.");
    } catch (error) {
      alert(error.response?.data?.message || "Gagal kirim ulang kode.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center">
      <div className="bg-white rounded-[20px] shadow-[0_4px_16px_rgba(0,0,0,0.25)] w-[90%] max-w-2xl overflow-hidden">
        <div className="relative h-36 bg-transparent overflow-hidden flex items-center justify-center">
          <svg
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            className="absolute top-0 left-0 w-full h-40"
          >
            <path
              d="M0,0 C250,150 250,150 500,0 L500,0 L0,0 Z"
              fill="#FBBF24"
            />
          </svg>
          <div className="z-10 rounded-full p-2">
            <IoShieldCheckmarkOutline className="text-4xl text-primary w-20 h-20" />
          </div>
        </div>

        <div className="px-8 pt-5 pb-10 text-center">
          <h1 className="text-lg lg:text-xl font-bold mb-2 tracking-wide">
            VERIFIKASI AKUN
          </h1>
          <p className="text-sm text-gray-700 mb-6 leading-relaxed">
            Kami telah mengirimkan kode pada email <strong>{email}</strong>
            <br />
            mohon cek email untuk memasukan kode
          </p>

          <div className="flex justify-center gap-3 mb-6">
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                maxLength={1}
                className="w-12 h-12 text-center border border-gray-400 rounded-[10px] text-xl font-bold focus:outline-none focus:ring-2 focus:ring-primary"
                ref={(el) => (inputRefs.current[i] = el)}
                onChange={(e) => handleInputChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
              />
            ))}
          </div>

          <Button
            text="Verifikasi Email"
            className="rounded-full py-2"
            onClick={handleVerifyOtp}
          />

          <p className="text-xs mt-4 text-gray-600">
            <button
              onClick={handleResendOtp}
              className="hover:underline font-medium"
            >
              Kirim Ulang Kode
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Otp;
