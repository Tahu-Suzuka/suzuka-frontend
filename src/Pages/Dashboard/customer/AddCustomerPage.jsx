import React from "react";
import { useNavigate } from "react-router-dom";

const AddCustomerPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg p-6 md:p-10 shadow-md">
        {/* Tombol Kembali */}
        <button
          onClick={() => navigate(-1)}
          className="text-primary text-sm mb-6"
        >
          &lt; Kembali
        </button>

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Kolom Kiri */}
          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Nama</label>
              <input
                type="text"
                placeholder="Masukan Nama Pelanggan"
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                placeholder="Masukan Email Pelanggan"
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Kata Sandi</label>
              <input
                type="password"
                placeholder="Masukan Kata Sandi"
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">No Hp</label>
              <input
                type="tel"
                placeholder="Masukan No Hp Pelanggan"
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>
          </div>

          {/* Kolom Kanan */}
          <div className="flex flex-col h-full justify-between">
            <div>
              <label className="block font-semibold mb-1">Alamat</label>
              <textarea
                rows={5}
                placeholder="Masukan Alamat Pelanggan"
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>

            {/* Tombol Submit */}
            <div className="mt-6 md:mt-auto text-end">
              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
              >
                Simpan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerPage;
