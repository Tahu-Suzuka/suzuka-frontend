import React, { useState } from "react";
import PasswordField from "../atoms/auth/PasswordField";
import { AuthService } from "../../services/AuthService";
import Button from "../atoms/Button";
import Alert from "../atoms/Alert";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleChangePassword = async () => {
    setMessage("");
    setError("");

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("Semua kolom harus diisi.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const data = await AuthService.changePassword({
        oldPassword,
        newPassword,
        token,
      });

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowAlert(true);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Gagal mengubah kata sandi.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      {showAlert && (
        <Alert
          message="Kata sandi berhasil diubah."
          onConfirm={() => setShowAlert(false)}
          confirmText="Tutup"
        />
      )}
      <h2 className="text-lg font-bold mb-1">Ubah Kata Sandi</h2>
      <p className="text-sm text-gray-600 mb-6">
        Kelola informasi profil Anda untuk melindungi akun Anda.
      </p>

      <div className="relative">
        <PasswordField
          id="old-password"
          label="Kata Sandi Lama"
          placeholder="Masukkan kata sandi lama"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          showPassword={showOld}
          toggleVisibility={() => setShowOld((prev) => !prev)}
          variant="profile"
        />
      </div>

      <PasswordField
        id="new-password"
        label="Kata Sandi Baru"
        placeholder="Masukkan kata sandi baru"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        showPassword={showNew}
        toggleVisibility={() => setShowNew((prev) => !prev)}
        variant="profile"
      />

      <PasswordField
        id="confirm-password"
        label="Konfirmasi Kata Sandi Baru"
        placeholder="Masukkan konfirmasi kata sandi baru"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        showPassword={showConfirm}
        toggleVisibility={() => setShowConfirm((prev) => !prev)}
        variant="profile"
      />

      {error && <p className="text-primary text-sm mt-2">{error}</p>}
      {message && <p className="text-green-500 text-sm mt-2">{message}</p>}

      <Button
        type="button"
        onClick={handleChangePassword}
        className="w-full text-white font-semibold py-2 mt-2 transition"
        disabled={loading}
      >
        {loading ? "Loading..." : "Ubah Kata Sandi"}
      </Button>

      <div className="mt-4 text-center">
        <a
          href="/forgot-password"
          className="text-sm text-primary hover:underline"
        >
          Lupa Kata Sandi?
        </a>
      </div>
    </div>
  );
};

export default ChangePassword;
