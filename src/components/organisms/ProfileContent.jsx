import React, { useEffect, useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import axios from "axios";
import { API_URL } from "../../services/API";
import Alert from "../atoms/Alert";
import { UserService } from "../../services/UserService";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ProfileContent = () => {
  const token = localStorage.getItem("token");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await UserService.getProfile();
        setName(profileData.name || "");
        setEmail(profileData.email || "");
        setPhone(profileData.phone || "");
        setAddress(profileData.address || "");
        if (profileData.image) {
          setImagePreview(`${API_URL}${profileData.image}`);
        }
      } catch (err) {
        console.error("Gagal mengambil profil:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Update data teks
      await axios.patch(
        `${API_URL}/auth/profile`,
        { name, address, phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (imageFile) {
        const formData = new FormData();
        formData.append("profile_picture", imageFile);
        await axios.patch(`${API_URL}/auth/profile/picture`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      const updatedProfile = await UserService.getProfile();
      localStorage.setItem("user", JSON.stringify(updatedProfile));
      window.dispatchEvent(new CustomEvent("profileUpdated"));

      setShowSuccessAlert(true);
    } catch (err) {
      console.error(err);
      alert("Gagal memperbarui profil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-lg font-bold mb-1">Profil Saya</h2>
      <p className="text-sm text-gray-600 mb-6">
        Kelola informasi profil Anda untuk melindungi akun Anda.
      </p>

      <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3 space-y-5 order-1">
          <Input
            id="name"
            label="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        </div>
        <div className="w-full md:w-1/3 flex flex-col items-center md:items-start order-2 md:order-last">
          <LazyLoadImage
            src={imagePreview || "/images/default-profile.png"}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover mb-4"
            effect="blur"
          />
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            className="text-sm w-full max-w-xs"
          />
          <p className="text-xs text-gray-500 mt-1">
            Ukuran maks. 1 MB <br />
            Format: .JPEG, .PNG
          </p>
        </div>
      </div>

      <div className="flex justify-start pt-6 mt-4 border-t">
        <Button
          onClick={handleSubmit}
          text={loading ? "Menyimpan..." : "Simpan"}
          width="w-32"
          className="rounded-md py-1 lg:py-2"
          disabled={loading}
        />
      </div>

      {showSuccessAlert && (
        <Alert
          message="Profil berhasil diperbarui!"
          onConfirm={() => setShowSuccessAlert(false)}
          confirmText="Tutup"
        />
      )}
    </div>
  );
};

export default ProfileContent;
