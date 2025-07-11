import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { CategoryService } from "../../../services/CategoryService";
import Alert from "../../../components/atoms/Alert";

const AddCategoryPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nama: "",
    gambar: null,
    preview: null,
  });

  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "gambar" && files.length > 0) {
      const file = files[0];
      setForm((prev) => ({
        ...prev,
        gambar: file,
        preview: URL.createObjectURL(file),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRemoveImage = () => {
    setForm((prev) => ({
      ...prev,
      gambar: null,
      preview: null,
    }));
    document.querySelector('input[name="gambar"]').value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await CategoryService.createCategory({
        name: form.nama,
        image: form.gambar,
        token,
      });
      setShowAlert(true);
    } catch (error) {
      alert(error.response?.data?.message || "Gagal menambahkan kategori.");
    } finally {
      setLoading(false);
    }
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
            {form.preview && (
              <div className="relative inline-block mb-4">
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full w-7 h-7 flex items-center justify-center text-red-600 hover:bg-gray-100"
                  title="Hapus gambar"
                >
                  <IoIosClose className="w-8 h-8" />
                </button>
                <img
                  src={form.preview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-md border"
                />
              </div>
            )}
            <input
              type="file"
              name="gambar"
              accept="image/*"
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>

          {/* Tombol Submit */}
          <div className="text-end">
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>

      {/* ✅ ALERT Berhasil */}
      {showAlert && (
        <Alert
          message="Kategori berhasil ditambahkan!"
          onConfirm={() => navigate(-1)}
          confirmText="OK"
        />
      )}
    </div>
  );
};

export default AddCategoryPage;
