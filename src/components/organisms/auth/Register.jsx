import React, { useState } from "react";
import Input from "../../atoms/Input";
import PasswordField from "../../atoms/auth/PasswordField";
import Divider from "../../atoms/auth/Divider";
import GoogleButton from "../../atoms/auth/GoogleButton";
import Button from "../../atoms/Button";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center left-14 mt-7">
      <form className="space-y-6 w-full max-w-md mx-auto px-4 md:px-0 font-montserrat">
        {/* Input Nama */}
        <Input
          id="name"
          label="Nama Lengkap"
          placeholder="Nama Anda"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Input Email */}
        <Input
          id="email"
          label="Email"
          placeholder="email@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Input Kata Sandi */}
        <PasswordField
          id="password"
          label="Kata Sandi"
          showPassword={showPassword}
          toggleVisibility={() => setShowPassword(!showPassword)}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <PasswordField
          id="confirmPassword"
          label="Konfirmasi Kata Sandi"
          showPassword={showConfirmPassword}
          toggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* Tombol Register */}
        <Button text="Daftar" className="rounded-full" />

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
