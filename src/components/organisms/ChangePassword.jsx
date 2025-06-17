import React, { useState } from "react";
import PasswordField from "../atoms/auth/PasswordField";
import Button from "../atoms/Button";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Kata sandi baru dan konfirmasi tidak cocok!");
      return;
    }

    // Kirim data ke backend di sini
    console.log("Password baru:", newPassword);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold text-center mb-4">Ubah Kata Sandi</h2>
      <form onSubmit={handleSubmit}>
        <PasswordField
          id="new-password"
          label="Kata Sandi Baru"
          placeholder="Masukkan kata sandi baru"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          showPassword={showNew}
          toggleVisibility={() => setShowNew((prev) => !prev)}
        />

        <PasswordField
          id="confirm-password"
          label="Konfirmasi Kata Sandi Baru"
          placeholder="Ulangi kata sandi baru"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          showPassword={showConfirm}
          toggleVisibility={() => setShowConfirm((prev) => !prev)}
        />

        <Button
          type="submit"
          text="Simpan Perubahan"
          bgColor="bg-red-500"
          className="mt-4 hover:bg-red-600"
        />
      </form>
    </div>
  );
};

export default ChangePassword;
