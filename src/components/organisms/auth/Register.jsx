import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../../services/AuthService";
import Input from "../../atoms/Input";
import PasswordField from "../../atoms/auth/PasswordField";
import Divider from "../../atoms/auth/Divider";
import GoogleButton from "../../atoms/auth/GoogleButton";
import Button from "../../atoms/Button";
import { FiMail } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameErr = name.trim() === "" ? "Nama tidak boleh kosong." : "";
    const emailErr =
      email.trim() === ""
        ? "Email tidak boleh kosong."
        : validateEmailClient(email);
    const passwordErr =
      password.trim() === ""
        ? "Kata sandi tidak boleh kosong."
        : validatePasswordClient(password);
    const confirmErr =
      confirmPassword.trim() === ""
        ? "Konfirmasi kata sandi tidak boleh kosong."
        : password !== confirmPassword
        ? "Konfirmasi kata sandi tidak cocok."
        : ""; // Set state error

    setNameError(nameErr);
    setEmailError(emailErr);
    setPasswordError(passwordErr);
    setConfirmPasswordError(confirmErr);

    if (nameErr || emailErr || passwordErr || confirmErr) {
      return;
    }

    try {
      await AuthService.register({ name, email, password });

      localStorage.setItem("temp_password", password);
      navigate("/otp", { state: { email } });
    } catch (error) {
      const msg = error.response?.data?.message || "Terjadi kesalahan.";
      console.error("Gagal register:", msg);
      alert(msg);
    }
  };

  const validatePasswordClient = (pwd) => {
    if (pwd.length < 8) {
      return "Kata Sandi harus minimal 8 karakter.";
    }
    if (!/\d/.test(pwd)) {
      return "Kata Sandi harus mengandung setidaknya satu angka.";
    }
    return "";
  };

  const validateEmailClient = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return "Format email tidak valid.";
    }
    return "";
  };

  return (
    <div className="w-full lg:w-1/2 p-6 flex flex-col justify-center left-14 mt-7">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-full max-w-md mx-auto px-4"
      >
        {/* Input Nama */}
        <Input
          id="name"
          label="Nama Lengkap"
          placeholder="Nama Anda"
          icon={RxAvatar}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}

        {/* Input Email */}
        <Input
          id="email"
          label="Email"
          placeholder="email@gmail.com"
          icon={FiMail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && (
          <p className="text-red-500 text-sm mt-1">{emailError}</p>
        )}

        {/* Input Kata Sandi */}
        <PasswordField
          id="password"
          label="Kata Sandi"
          showPassword={showPassword}
          toggleVisibility={() => setShowPassword(!showPassword)}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && (
          <p className="text-primary text-sm">{passwordError}</p>
        )}

        <PasswordField
          id="confirmPassword"
          label="Konfirmasi Kata Sandi"
          showPassword={showConfirmPassword}
          toggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {confirmPasswordError && (
          <p className="text-primary text-sm">{confirmPasswordError}</p>
        )}

        {/* Tombol Register */}
        <Button type="submit" text="Daftar" className="rounded-xl py-2" />

        <Divider />

        <GoogleButton text="Daftar Dengan Google" />

        {/* Link ke Login */}
        <div className="text-center text-xs text-gray-500">
          <span>Sudah punya akun? </span>
          <a
            href="/login"
            className="text-primary font-semibold hover:text-indigo-800 transition duration-300"
          >
            Masuk
          </a>
        </div>
      </form>
    </div>
  );
}
