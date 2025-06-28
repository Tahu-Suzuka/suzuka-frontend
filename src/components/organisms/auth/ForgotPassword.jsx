import React, { useState } from "react";
import Input from "../../atoms/Input";
import PasswordField from "../../atoms/auth/PasswordField";
import Divider from "../../atoms/auth/Divider";
import GoogleButton from "../../atoms/auth/GoogleButton";
import Button from "../../atoms/Button";
import { FiMail } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";
import { IoKeyOutline } from "react-icons/io5";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center left-14 mt-7">
      <h1 className="text-2xl lg:text-3xl text-center tracking-wide mb-8">
        Lupa Kata Sandi
      </h1>
      <form className="space-y-6 w-full max-w-md mx-auto px-4 md:px-0">
        {/* Input Email */}
        <Input
          id="email"
          label="Email"
          placeholder="email@gmail.com"
          icon={FiMail}
          value={name}
          onChange={(e) => setName(e.target.value)}
          rightElement={
            <button
              type="button"
              onClick={() => console.log("Kirim kode diklik")}
              className="text-sm text-white bg-primary  rounded-e-full w-24 h-14 -mr-4 hover:font-bold"
            >
              Kirim Kode
            </button>
          }
        />

        {/* Input Kode Verifikasi */}
        <Input
          id="kodeVerifikasi"
          label="Kode Verifikasi"
          placeholder="******"
          icon={IoKeyOutline}
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
        <Button type="submit" text="Simpan" className="rounded-full py-4" />
      </form>
    </div>
  );
}
