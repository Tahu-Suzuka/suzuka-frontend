import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { CategoryService } from "../../../services/CategoryService";
import Alert from "../../../components/atoms/Alert";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const EditCategoryPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    nama: "",
    gambar: null,
    preview: null,
  });

  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await CategoryService.getCategoryById(id);

        const imageUrl = res.data.image?.startsWith("http")
          ? res.data.image
          : `${import.meta.env.VITE_API_URL || "http://34.101.147.220:8080"}${
              res.data.image
            }`;

        setForm((prev) => ({
          ...prev,
          nama: res.data.category_name,
          preview: imageUrl,
        }));
      } catch (error) {
        alert("Gagal mengambil data kategori.");
        navigate(-1);
      }
    };

    fetchCategory();
  }, [id, navigate]);

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
      await CategoryService.updateCategory({
        id,
        name: form.nama,
        image: form.gambar,
        token,
      });

      setShowAlert(true);
    } catch (error) {
      alert(error.response?.data?.message || "Gagal memperbarui kategori.");
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
          className="text-primary font-medium text-sm mb-6"
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
            <label className="block font-semibold mb-1">Ubah Foto</label>
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
                <LazyLoadImage
                  src={form.preview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-md border"
                  effect="blur"
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
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>

      {showAlert && (
        <Alert
          message="Kategori berhasil diperbarui!"
          onConfirm={() => navigate(-1)}
          confirmText="OK"
        />
      )}
    </div>
  );
};

export default EditCategoryPage;
