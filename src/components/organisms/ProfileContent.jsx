import React, { useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

const ProfileContent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  return (
    <div>
      <h2 className="text-lg font-semibold mb-1">Profil Saya</h2>
      <p className="text-sm text-gray-600 mb-6">
        Kelola informasi profil Anda untuk mengontrol, melindungi dan
        mengamankan akun
      </p>

      <div className="border-t border-gray-200 pt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-5">
          {/* Nama */}
          <Input
            id="name"
            label="Nama"
            placeholder="Masukkan nama lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="profile"
          />

          {/* Email */}
          <Input
            id="email"
            label="Email"
            placeholder="Masukkan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="profile"
          />

          {/* Nomor Telepon */}
          <Input
            id="phone"
            label="Nomor Telepon"
            placeholder="Masukkan nomor telepon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            variant="profile"
          />

          {/* Alamat */}
          <Input
            id="address"
            label="Alamat"
            placeholder="Masukkan alamat lengkap"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            variant="profile"
          />

          <div>
            <div className="flex justify-start pt-4 ">
              <Button
                text="Simpan"
                width="w-32"
                py="py-2"
                className="text-black border-black"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-start">
          <img
            src="/images/img1.png"
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
          <button className="text-sm text-primary font-medium mb-2 hover:underline">
            Pilih Gambar
          </button>
          <p className="text-xs text-gray-500 text-center">
            Ukuran gambar: maks. 1 MB <br />
            Format gambar: .JPEG, .PNG
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
