import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const GoogleCallbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState("Memproses autentikasi...");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const userString = params.get("user");

    if (token && userString) {
      try {
        const user = JSON.parse(decodeURIComponent(userString));
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setMessage("Login berhasil! Anda akan diarahkan...");

        if (user.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Gagal memproses data pengguna:", error);
        setMessage(
          "Terjadi kesalahan saat memproses data Anda. Silakan coba lagi."
        );
        setTimeout(() => navigate("/login"), 3000);
      }
    } else {
      setMessage(
        "Gagal mendapatkan informasi autentikasi. Mengarahkan kembali ke halaman login..."
      );
      setTimeout(() => navigate("/login"), 3000);
    }
  }, [navigate, location]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <p>{message}</p>
    </div>
  );
};

export default GoogleCallbackPage;
