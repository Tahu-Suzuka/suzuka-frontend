import React, { useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

const ProfileContent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-lg font-bold mb-1">Profil Saya</h2>
      <p className="text-sm text-gray-600 mb-6">
        Kelola informasi profil Anda untuk mengontrol, melindungi dan
        mengamankan akun
      </p>

      <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row gap-8">
        {/* Form Input - berada di kiri saat lg */}
        <div className="w-full md:w-2/3 order-2 lg:order-1 space-y-5">
          <Input
            id="name"
            label="Nama"
            placeholder="Masukkan nama lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="profile"
          />
          <Input
            id="email"
            label="Email"
            placeholder="Masukkan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="profile"
          />
          <Input
            id="phone"
            label="Nomor Telepon"
            placeholder="Masukkan nomor telepon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            variant="profile"
          />
          <Input
            id="address"
            label="Alamat"
            placeholder="Masukkan alamat lengkap"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            variant="profile"
          />

          <div className="flex justify-start lg:pt-2">
            <Button
              text="Simpan"
              width="w-32"
              className="rounded-md py-1 lg:py-2"
            />
          </div>
        </div>

        <div className="w-full md:w-1/3 flex flex-col items-center md:items-start order-1 lg:order-2">
          <img
            src="/images/default-profile.png"
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
          <button className="text-sm text-primary font-medium mb-2 hover:underline">
            Pilih Gambar
          </button>
          <p className="text-xs text-gray-500 text-center md:text-left">
            Ukuran gambar: maks. 1 MB <br />
            Format gambar: .JPEG, .PNG
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
