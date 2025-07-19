import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { ProductService } from "../../../services/ProductService";
import { CategoryService } from "../../../services/CategoryService";
import Alert from "../../../components/atoms/Alert";
import "react-lazy-load-image-component/src/effects/blur.css";

const EditProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    nama: "",
    kategori: "",
    deskripsi: "",
    variasi: [{ nama: "", harga: "" }],
    gambarUtama: null,
    gambar1: null,
    gambar2: null,
    gambar3: null,
    previewGambarUtama: null,
    previewGambar1: null,
    previewGambar2: null,
    previewGambar3: null,
  });

  const [kategoriOptions, setKategoriOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const [productRes, kategoriRes] = await Promise.all([
          ProductService.getById(id, token),
          CategoryService.getAllCategories(),
        ]);

        const data = productRes.data;
        setForm((prev) => ({
          ...prev,
          nama: data.product_name,
          kategori: String(data.category_id),
          deskripsi: data.description,
          variasi:
            data.variations?.map((v) => ({
              nama: v.name,
              harga: "Rp" + v.price.toLocaleString("id-ID"),
            })) || [],
          previewGambarUtama: data.mainImage,
          previewGambar1: data.additionalImage1 || null,
          previewGambar2: data.additionalImage2 || null,
          previewGambar3: data.additionalImage3 || null,
        }));

        setKategoriOptions(kategoriRes.data);
      } catch (err) {
        console.error("Gagal fetch detail produk:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const formatRupiah = (angka) => {
    const numberString = angka.replace(/[^\d]/g, "");
    const sisa = numberString.length % 3;
    let rupiah = numberString.substr(0, sisa);
    const ribuan = numberString.substr(sisa).match(/\d{3}/g);
    if (ribuan) {
      rupiah += (sisa ? "." : "") + ribuan.join(".");
    }
    return "Rp" + rupiah;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      const previewKey =
        "preview" + name.charAt(0).toUpperCase() + name.slice(1);
      setForm((prev) => ({
        ...prev,
        [name]: file,
        [previewKey]: URL.createObjectURL(file),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleRemoveImage = (name) => {
    const previewKey = "preview" + name.charAt(0).toUpperCase() + name.slice(1);
    setForm((prev) => ({
      ...prev,
      [name]: null,
      [previewKey]: null,
    }));
    document.querySelector(`input[name="${name}"]`).value = "";
  };

  const handleVariasiChange = (index, field, value) => {
    const newVariasi = [...form.variasi];
    newVariasi[index][field] = field === "harga" ? formatRupiah(value) : value;
    setForm((prev) => ({
      ...prev,
      variasi: newVariasi,
    }));
  };

  const addVariasi = () => {
    if (form.variasi.length < 3) {
      setForm((prev) => ({
        ...prev,
        variasi: [...prev.variasi, { nama: "", harga: "" }],
      }));
    }
  };

  const removeVariasi = (index) => {
    const newVariasi = form.variasi.filter((_, i) => i !== index);
    setForm((prev) => ({
      ...prev,
      variasi: newVariasi,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("product_name", form.nama);
      formData.append(
        "price",
        parseInt(form.variasi[0].harga.replace(/\D/g, ""), 10)
      );
      formData.append("description", form.deskripsi);
      formData.append("categoryId", form.kategori);

      form.variasi.forEach((v, i) => {
        formData.append(`variations[${i}][name]`, v.nama);
        formData.append(
          `variations[${i}][price]`,
          parseInt(v.harga.replace(/\D/g, ""), 10)
        );
      });

      if (form.gambarUtama) formData.append("mainImage", form.gambarUtama);
      if (form.gambar1) formData.append("additionalImages", form.gambar1);
      if (form.gambar2) formData.append("additionalImages", form.gambar2);
      if (form.gambar3) formData.append("additionalImages", form.gambar3);

      await ProductService.update(id, formData, token);
      setShowAlert(true);
    } catch (err) {
      console.error("Gagal update produk:", err);
      alert("Gagal memperbarui produk.");
    } finally {
      setLoading(false);
    }
  };

  const renderUploadField = (label, name, required = false) => {
    const previewKey = "preview" + name.charAt(0).toUpperCase() + name.slice(1);
    return (
      <div>
        <label className="block text-sm font-medium mb-1">{label}</label>
        {form[previewKey] && (
          <div className="mb-2 relative inline-block">
            <button
              type="button"
              onClick={() => handleRemoveImage(name)}
              className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full w-7 h-7 flex items-center justify-center text-red-600 hover:bg-gray-100"
              title="Hapus gambar"
            >
              <IoIosClose className="w-8 h-8" />
            </button>
            <img
              src={form[previewKey]}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-md border"
              effect="blur"
            />
          </div>
        )}
        <input
          type="file"
          name={name}
          accept="image/*"
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md"
          required={required}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white p-6 md:p-10 rounded-xl shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="text-primary font-medium text-sm mb-4"
        >
          &lt; Kembali
        </button>

        <h1 className="text-xl font-bold text-gray-800 mb-6">Ubah Produk</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nama Produk
                </label>
                <input
                  type="text"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Kategori
                </label>
                <select
                  name="kategori"
                  value={form.kategori}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-md"
                  required
                >
                  <option value="" disabled>
                    Pilih kategori
                  </option>
                  {kategoriOptions.map((opt) => (
                    <option key={opt.id} value={String(opt.id)}>
                      {opt.category_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Variasi Produk
                </label>
                {form.variasi.map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2 items-center">
                    <input
                      type="text"
                      placeholder="Nama Variasi"
                      value={item.nama}
                      onChange={(e) =>
                        handleVariasiChange(index, "nama", e.target.value)
                      }
                      className="w-full border px-4 py-2 rounded-md"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Harga"
                      value={item.harga}
                      onChange={(e) =>
                        handleVariasiChange(index, "harga", e.target.value)
                      }
                      className="w-full border px-4 py-2 rounded-md"
                      required
                    />
                    {form.variasi.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariasi(index)}
                        className="text-primary hover:underline text-xs hover:text-red-700 px-2"
                      >
                        Hapus
                      </button>
                    )}
                  </div>
                ))}
                {form.variasi.length < 3 && (
                  <button
                    type="button"
                    onClick={addVariasi}
                    className="text-sm text-primary mt-1 hover:underline"
                  >
                    + Tambah variasi lain
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {renderUploadField("Gambar Utama", "gambarUtama", false)}
              {renderUploadField("Pilihan Gambar 1", "gambar1")}
              {renderUploadField("Pilihan Gambar 2", "gambar2")}
              {renderUploadField("Pilihan Gambar 3", "gambar3")}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Deskripsi</label>
            <textarea
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md min-h-[150px]"
              required
            />
          </div>

          <div className="pt-4 justify-end flex">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-opacity-90 disabled:bg-opacity-60"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>

      {showAlert && (
        <Alert
          message="Produk berhasil diperbarui!"
          onConfirm={() => navigate("/dashboard/productDashboard")}
          confirmText="Tutup"
        />
      )}
    </div>
  );
};

export default EditProductPage;
