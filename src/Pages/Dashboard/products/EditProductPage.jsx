import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePlus } from "lucide-react";

const EditProductPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nama: "",
    kategori: "",
    deskripsi: "",
    variasi: [{ nama: "", harga: "" }],
    gambarUtama: null,
    gambar1: null,
    gambar2: null,
    gambar3: null,
  });

  useEffect(() => {
    if (window.ckeditorInstance) return;

    const script = document.createElement("script");
    script.src =
      "https://cdn.ckeditor.com/ckeditor5/39.0.1/classic/ckeditor.js";
    script.onload = () => {
      if (window.ClassicEditor && !window.ckeditorInstance) {
        window.ClassicEditor.create(document.querySelector("#deskripsi"))
          .then((editor) => {
            window.ckeditorInstance = editor;
          })
          .catch((error) => {
            console.error("CKEditor init error:", error);
          });
      }
    };
    document.body.appendChild(script);

    return () => {
      if (window.ckeditorInstance) {
        window.ckeditorInstance.destroy().catch(() => {});
        window.ckeditorInstance = null;
      }
    };
  }, []);

  const formatRupiah = (angka) => {
    const numberString = angka.replace(/[^,\d]/g, "").toString();
    const split = numberString.split(",");
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);
    if (ribuan) {
      const separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }
    return "Rp" + rupiah + (split[1] !== undefined ? "," + split[1] : "");
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const deskripsiValue = window.ckeditorInstance?.getData() || "";

    const cleanVariasi = form.variasi.map((item) => ({
      ...item,
      harga: parseInt(item.harga.replace(/\D/g, ""), 10),
    }));

    const finalForm = {
      ...form,
      deskripsi: deskripsiValue,
      variasi: cleanVariasi,
    };

    console.log("Data disubmit:", finalForm);
    navigate(-1);
  };

  const kategoriOptions = [
    "Tahu Kuning",
    "Tahu Putih",
    "Tahu Stik",
    "Kerupuk Tahu",
  ];

  const renderUploadField = (label, name, required = false) => (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="flex items-center gap-4 border rounded-md px-4 py-2">
        <ImagePlus className="w-5 h-5 text-gray-400" />
        <input
          type="file"
          name={name}
          accept="image/*"
          onChange={handleChange}
          className="w-full"
          required={required}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white p-6 md:p-10 rounded-xl shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="text-primary font-medium text-sm mb-4"
        >
          &lt; Kembali
        </button>

        <h1 className="text-xl font-bold text-gray-800 mb-6">Edit Produk</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-6">
            {/* Kiri */}
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
                  className="w-full border px-4 py-2 rounded-md text-gray-600"
                  required
                >
                  <option value="" disabled>
                    Pilih kategori
                  </option>
                  {kategoriOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
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

            {/* Kanan */}
            <div className="space-y-4">
              {renderUploadField("Gambar Utama", "gambarUtama", true)}
              {renderUploadField("Pilihan Gambar 1", "gambar1")}
              {renderUploadField("Pilihan Gambar 2", "gambar2")}
              {renderUploadField("Pilihan Gambar 3", "gambar3")}
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-medium mb-1">Deskripsi</label>
            <textarea
              id="deskripsi"
              name="deskripsi"
              defaultValue={form.deskripsi}
              rows="4"
              className="w-full border px-4 py-2 rounded-md"
              required
            ></textarea>
          </div>

          {/* Submit */}
          <div className="pt-4 justify-end flex">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-opacity-90"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;
