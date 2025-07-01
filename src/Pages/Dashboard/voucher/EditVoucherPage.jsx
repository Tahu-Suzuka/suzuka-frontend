import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const EditVoucherPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    kode: "",
    tipe: "",
    minPembelian: "",
    nilai: "",
    mulai: "",
    sampai: "",
  });

  useEffect(() => {
    // Simulasi fetch data voucher untuk diedit (nanti bisa ganti pakai axios)
    const fetchVoucher = async () => {
      // data dummy
      const data = {
        kode: "DISKON10",
        tipe: "Potongan Ongkir",
        minPembelian: "Rp100.000",
        nilai: "10",
        mulai: "2025-06-01",
        sampai: "2025-06-30",
      };
      setForm(data);
    };

    fetchVoucher();
  }, [id]);

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
    const { name, value } = e.target;
    if (name === "minPembelian" || name === "nilai") {
      setForm((prev) => ({
        ...prev,
        [name]: formatRupiah(value),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Update voucher:", form);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="text-primary text-sm flex font-semibold items-center gap-1 mb-4"
      >
        <ChevronLeft size={16} /> Kembali
      </button>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kiri */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Kode Voucher
              </label>
              <input
                type="text"
                name="kode"
                value={form.kode}
                onChange={handleChange}
                placeholder="Masukan Kode Voucher"
                className="w-full border px-4 py-2 rounded-md"
                required
              />
            </div>

            <select
              name="tipe"
              value={form.tipe}
              onChange={handleChange}
              className={`w-full border px-4 py-2 rounded-md ${
                form.tipe ? "text-black" : "text-gray-400"
              }`}
              required
            >
              <option value="" disabled>
                Pilih Tipe
              </option>
              <option value="Potongan Harga">Potongan Harga</option>
              <option value="Potongan Ongkir">Potongan Ongkir</option>
            </select>

            <div>
              <label className="block text-sm font-medium mb-1">
                Minimum Pembelian
              </label>
              <input
                type="text"
                name="minPembelian"
                value={form.minPembelian}
                onChange={handleChange}
                placeholder="Masukan Minimum Pembelian"
                className="w-full border px-4 py-2 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Nilai Diskon
              </label>
              <input
                type="text"
                name="nilai"
                value={form.nilai}
                onChange={handleChange}
                placeholder="Masukan Nilai Diskon"
                className="w-full border px-4 py-2 rounded-md"
                required
              />
            </div>
          </div>

          {/* Kanan */}
          <div className="space-y-4">
            <label className="block text-sm font-medium mb-1 text-center">
              Masa Berlaku
            </label>
            <div className="flex items-center gap-3">
              <input
                type="date"
                name="mulai"
                value={form.mulai}
                onChange={handleChange}
                className="border px-4 py-2 rounded-md w-full"
                required
              />
              <span className="text-sm font-bold">-</span>
              <input
                type="date"
                name="sampai"
                value={form.sampai}
                onChange={handleChange}
                className="border px-4 py-2 rounded-md w-full"
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditVoucherPage;
