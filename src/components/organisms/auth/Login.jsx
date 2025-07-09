import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../../services/AuthService";
import Input from "../../atoms/Input";
import PasswordField from "../../atoms/auth/PasswordField";
import Divider from "../../atoms/auth/Divider";
import GoogleButton from "../../atoms/auth/GoogleButton";
import Button from "../../atoms/Button";
import { FiMail } from "react-icons/fi";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const validateEmailClient = (email) => {
    if (email.trim() === "") return "Email tidak boleh kosong.";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) return "Format email tidak valid.";
    return "";
  };

  const validatePasswordClient = (password) => {
    if (password.trim() === "") return "Kata sandi tidak boleh kosong.";
    return "";
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailErr = validateEmailClient(email);
    const passwordErr = validatePasswordClient(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);
    setLoginError("");
    if (emailErr || passwordErr) return;

    try {
      const res = await AuthService.login(email, password);

      // ✅ Simpan token dan user ke localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ Arahkan admin ke dashboard, lainnya ke beranda
      if (res.data.user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Email atau kata sandi salah.";
      setLoginError(msg);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center left-14">
      <h1 className="text-3xl lg:text-4xl text-center tracking-wide mb-8">
        Selamat Datang
      </h1>

      <form
        onSubmit={handleLogin}
        className="space-y-6 w-full max-w-md mx-auto px-4 md:px-0 font-montserrat"
      >
        {loginError && (
          <p className="text-primary text-center text-sm -mt-3">{loginError}</p>
        )}

        <Input
          id="email"
          label="Email"
          placeholder="email@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={FiMail}
          variant="auth"
        />
        {emailError && (
          <p className="text-primary text-sm mt-1">{emailError}</p>
        )}

        <PasswordField
          id="password"
          label="Kata Sandi"
          showPassword={showPassword}
          toggleVisibility={togglePasswordVisibility}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && (
          <p className="text-primary text-sm mt-1">{passwordError}</p>
        )}

        <div className="flex justify-end">
          <a
            href="/forgot-password"
            className="text-xs text-primary font-bold hover:text-gray-800 transition duration-300"
          >
            Lupa Kata Sandi?
          </a>
        </div>

        <Button type="submit" text="Masuk" className="rounded-full py-3" />
        <Divider />
        <GoogleButton text="Masuk Dengan Google" />

        <div className="text-center text-xs text-gray-500">
          <span>Apakah anda belum memiliki akun? </span>
          <a
            href="/register"
            className="text-primary font-semibold hover:text-indigo-800 transition duration-300"
          >
            Daftar
          </a>
        </div>
      </form>
    </div>
  );
}
