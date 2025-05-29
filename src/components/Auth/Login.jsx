import React, { useState } from "react";
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import Divider from "./Divider";
import GoogleButton from "./GoogleButton";
import Button from "../ui/Button/Button";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center left-14">
      <h1 className="text-5xl text-center font-bebas font-normal tracking-wide mb-8">
        Selamat Datang
      </h1>

      <form className="space-y-6 w-full max-w-md mx-auto px-4 md:px-0 font-montserrat">
        <InputField
          id="email"
          label="Email"
          placeholder="email@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordField
          showPassword={showPassword}
          toggleVisibility={togglePasswordVisibility}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-end">
          <a
            href="#"
            className="text-xs text-primary font-bold hover:text-gray-800 transition duration-300"
          >
            Lupa Kata Sandi?
          </a>
        </div>

        <Button type="submit" text="Masuk" />
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
