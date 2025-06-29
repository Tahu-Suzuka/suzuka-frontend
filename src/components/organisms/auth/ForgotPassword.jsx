import React, { useState } from "react";
import Input from "../../atoms/Input";
import PasswordField from "../../atoms/auth/PasswordField";
import Button from "../../atoms/Button";
import { FiMail } from "react-icons/fi";
import { IoKeyOutline } from "react-icons/io5";
import { AuthService } from "../../../services/AuthServices";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [resetError, setResetError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = (value) => {
    if (!value.trim()) return "Email tidak boleh kosong.";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) return "Format email tidak valid.";
    return "";
  };

  const validatePassword = (value) => {
    if (value.length < 8) return "Kata sandi minimal 8 karakter.";
    if (!/\d/.test(value)) return "Kata sandi harus mengandung angka.";
    return "";
  };

  const handleSendOtp = async () => {
    const emailErr = validateEmail(email);
    setEmailError(emailErr);
    setResetError("");
    setSuccessMessage("");

    if (emailErr) return;

    try {
      await AuthService.forgotPassword(email);
      setSuccessMessage("Kode OTP berhasil dikirim ke email Anda.");
    } catch (err) {
      const msg = err.response?.data?.message || "Gagal mengirim OTP.";
      setResetError(msg);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    const otpErr = !otp.trim()
      ? "Kode OTP tidak boleh kosong."
      : !/^\d{6}$/.test(otp)
      ? "Kode OTP harus 6 digit angka."
      : "";

    const passErr = validatePassword(password);
    const confirmErr =
      password !== confirmPassword ? "Konfirmasi kata sandi tidak cocok." : "";

    setEmailError(emailErr);
    setOtpError(otpErr);
    setPasswordError(passErr);
    setConfirmPasswordError(confirmErr);
    setResetError("");
    setSuccessMessage("");

    if (emailErr || otpErr || passErr || confirmErr) return;

    try {
      await AuthService.resetPassword({ email, otp, newPassword: password });
      setSuccessMessage("Password berhasil direset. Silakan login kembali.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      const msg = err.response?.data?.message || "Gagal reset password.";
      setResetError(msg);
    }
  };

  return (
    <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center left-14 mt-7">
      <h1 className="text-2xl lg:text-3xl text-center tracking-wide mb-8">
        Lupa Kata Sandi
      </h1>

      <form
        onSubmit={handleResetPassword}
        className="space-y-6 w-full max-w-md mx-auto px-4 md:px-0"
      >
        {/* Error atau Success Message */}
        {resetError && (
          <p className="text-red-500 text-center text-sm">{resetError}</p>
        )}
        {successMessage && (
          <p className="text-green-600 text-center text-sm">{successMessage}</p>
        )}

        <Input
          id="email"
          label="Email"
          placeholder="email@gmail.com"
          icon={FiMail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          rightElement={
            <button
              type="button"
              onClick={handleSendOtp}
              className="text-sm text-white bg-primary rounded-e-full w-24 h-14 -mr-4 hover:font-bold"
            >
              Kirim Kode
            </button>
          }
        />
        {emailError && (
          <p className="text-red-500 text-sm mt-1">{emailError}</p>
        )}

        <Input
          id="otp"
          label="Kode Verifikasi"
          placeholder="******"
          icon={IoKeyOutline}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        {otpError && <p className="text-red-500 text-sm mt-1">{otpError}</p>}

        <PasswordField
          id="password"
          label="Kata Sandi Baru"
          showPassword={showPassword}
          toggleVisibility={() => setShowPassword(!showPassword)}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && (
          <p className="text-red-500 text-sm mt-1">{passwordError}</p>
        )}

        <PasswordField
          id="confirmPassword"
          label="Konfirmasi Kata Sandi Baru"
          showPassword={showConfirmPassword}
          toggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {confirmPasswordError && (
          <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>
        )}

        <Button type="submit" text="Simpan" className="rounded-full py-3" />
      </form>
    </div>
  );
}
