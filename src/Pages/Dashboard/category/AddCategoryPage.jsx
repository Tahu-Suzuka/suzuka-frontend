import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCategoryPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nama: "",
    gambar: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "gambar") {
      setForm((prev) => ({ ...prev, gambar: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data yang dikirim:", form);
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg p-6 md:p-10 shadow-md">
        {/* Tombol Kembali */}
        <button
          onClick={() => navigate(-1)}
          className="text-primary font-semibold text-sm mb-6"
        >
          &lt; Kembali
        </button>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nama Kategori */}
          <div>
            <label className="block font-semibold mb-1">Nama Kategori</label>
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Masukkan Nama Kategori"
              className="w-full border px-4 py-2 rounded-md"
              required
            />
          </div>

          {/* Unggah Foto */}
          <div>
            <label className="block font-semibold mb-1">Unggah Foto</label>
            <input
              type="file"
              name="gambar"
              accept="image/*"
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md"
              required
            />
            {form.gambar && (
              <p className="text-sm text-gray-500 mt-1">
                File terpilih: {form.gambar.name}
              </p>
            )}
          </div>

          {/* Tombol Submit */}
          <div className="text-end">
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryPage;
