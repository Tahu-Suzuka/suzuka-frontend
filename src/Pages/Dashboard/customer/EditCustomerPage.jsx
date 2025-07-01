import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditCustomerPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    noHp: "",
    alamat: "",
  });

  // Dummy data
  useEffect(() => {
    const fetchedData = {
      nama: "Andi Setiawan",
      email: "andi@example.com",
      password: "********",
      noHp: "081234567890",
      alamat: "Jl. Merdeka No. 123, Jakarta",
    };
    setForm(fetchedData);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data diperbarui:", form);
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg p-6 md:p-10 shadow-md">
        {/* Tombol Kembali */}
        <button
          onClick={() => navigate(-1)}
          className="text-primary font-medium text-sm mb-6"
        >
          &lt; Kembali
        </button>

        {/* Form */}
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start"
          onSubmit={handleSubmit}
        >
          {/* Kolom Kiri */}
          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Nama</label>
              <input
                type="text"
                name="nama"
                value={form.nama}
                onChange={handleChange}
                placeholder="Masukan Nama Pelanggan"
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Masukan Email Pelanggan"
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Kata Sandi</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Masukan Kata Sandi"
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">No Hp</label>
              <input
                type="tel"
                name="noHp"
                value={form.noHp}
                onChange={handleChange}
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
                name="alamat"
                value={form.alamat}
                onChange={handleChange}
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
                Simpan Perubahan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCustomerPage;
