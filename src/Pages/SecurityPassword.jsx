import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import PasswordField from "../components/atoms/auth/PasswordField"; // pastikan path ini benar
import Button from "../components/atoms/Button"; // pastikan path ini benar

const SecurityPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="pt-16 bg-[#F3F4F6] flex items-center justify-center ">
      <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-md text-center relative">
        {/* Tombol kembali */}
        <button
          onClick={() => navigate("/security-check")}
          className="absolute left-4 top-4 text-primary hover:text-red-400"
        >
          <FiArrowLeft size={24} />
        </button>

        {/* Judul dan deskripsi */}
        <h1 className="text-xl font-bold mb-2 pt-2">Verifikasi Kata Sandi</h1>
        <p className="text-sm text-gray-600 mb-6">
          Masukkan kata sandi akun Anda untuk memverifikasi identitas Anda.
        </p>

        {/* PasswordField tanpa ikon */}
        <PasswordField
          id="verify-password"
          label="" // tidak tampilkan label
          placeholder="Masukkan kata sandi saat ini"
          showPassword={showPassword}
          toggleVisibility={toggleVisibility}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          withIcon={false} // hilangkan icon kunci
        />

        {/* Tombol menggunakan komponen Button */}
        <Button
          type="submit"
          text="Konfirmasi"
          textColor="text-white"
          py="py-2"
          className="rounded-full hover:bg-red-500"
        />
      </div>
    </div>
  );
};

export default SecurityPassword;
