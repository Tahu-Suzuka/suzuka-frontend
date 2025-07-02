import React, { useEffect, useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import axios from "axios";
import { API_URL } from "../../services/API";
import Alert from "../atoms/Alert";

const ProfileContent = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const token = localStorage.getItem("token");

  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null); // bisa string (path) atau File
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { phone, address, image } = res.data.data;
        setPhone(phone || "");
        setAddress(address || "");
        setImage(image || null); // path dari server
      } catch (err) {
        console.error("Gagal mengambil profil:", err);
      }
    };

    if (token) fetchProfile();
  }, [token]);

  const handleSubmit = async () => {
    try {
      await axios.patch(
        `${API_URL}/auth/profile`,
        { address, phone },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (image && typeof image !== "string") {
        const formData = new FormData();
        formData.append("profile_picture", image);

        const res = await axios.patch(
          `${API_URL}/auth/profile/picture`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setImage(res.data.data.image);
      }

      // Tampilkan alert
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 2000);
    } catch (err) {
      console.error(err);
      alert("Gagal memperbarui profil");
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-lg font-bold mb-1">Profil Saya</h2>
      <p className="text-sm text-gray-600 mb-6">
        Kelola informasi profil Anda untuk melindungi akun Anda.
      </p>

      <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row gap-8">
        {/* Form kiri */}
        <div className="w-full md:w-2/3 space-y-5">
          <Input
            id="name"
            label="Nama"
            value={name}
            readOnly
            className="bg-gray-100 cursor-not-allowed"
            variant="profile"
          />
          <Input
            id="email"
            label="Email"
            value={email}
            readOnly
            className="bg-gray-100 cursor-not-allowed"
            variant="profile"
          />
          <Input
            id="phone"
            label="Nomor Telepon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Masukkan nomor telepon"
            variant="profile"
          />
          <Input
            id="address"
            label="Alamat"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Masukkan alamat lengkap"
            variant="profile"
          />

          <div className="flex justify-start pt-2">
            <Button
              onClick={handleSubmit}
              text="Simpan"
              width="w-32"
              className="rounded-md py-1 lg:py-2"
            />
          </div>
        </div>

        {/* Gambar profil */}
        <div className="flex flex-col items-center md:items-start">
          {/* Preview gambar */}
          {image && (
            <img
              src={
                typeof image === "string"
                  ? image.startsWith("http") || image.startsWith("/")
                    ? image
                    : `${API_URL}/${image}`
                  : URL.createObjectURL(image)
              }
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
          )}

          <input
            type="file"
            id="file-upload"
            accept="image/png, image/jpeg"
            onChange={(e) => setImage(e.target.files[0])}
            className="hidden"
          />

          <label
            htmlFor="file-upload"
            className="cursor-pointer text-sm bg-primary text-white px-4 py-1 rounded-md hover:bg-red-700"
          >
            {image ? "Ganti Foto" : "Unggah Foto"}
          </label>

          <p className="text-xs text-gray-500 mt-1 text-center md:text-left">
            Ukuran maks. 1 MB <br />
            Format: .JPEG, .PNG
          </p>
        </div>
      </div>

      {/* Alert Berhasil */}
      {showSuccessAlert && (
        <Alert
          message="Profil berhasil diperbarui!"
          onCancel={() => setShowSuccessAlert(false)}
          cancelText="Tutup"
        />
      )}
    </div>
  );
};

export default ProfileContent;
