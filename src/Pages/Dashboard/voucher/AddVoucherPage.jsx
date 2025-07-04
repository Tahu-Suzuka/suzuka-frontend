import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Alert from "../../../components/atoms/Alert";
import { VoucherService } from "../../../services/VoucherService";

const AddVoucherPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    kode: "",
    tipe: "",
    minPembelian: "",
    nilai: "",
    mulai: "",
    sampai: "",
  });

  const [alert, setAlert] = useState({ message: "", show: false });

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

  const parseRupiah = (rupiahStr) => {
    return parseInt(rupiahStr.replace(/[^\d]/g, ""), 10);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const payload = {
        code: form.kode,
        type: form.tipe.toUpperCase().replace(" ", "_"),
        minPurchase: parseRupiah(form.minPembelian),
        value: parseRupiah(form.nilai),
        validFrom: form.mulai,
        validUntil: form.sampai,
        description: `Voucher ${form.kode} berlaku dari ${form.mulai} sampai ${form.sampai}`,
        usageLimit: 50,
      };

      await VoucherService.create(payload, token);

      setAlert({ message: "Voucher berhasil ditambahkan!", show: true });
      setTimeout(() => navigate("/dashboard/voucher"), 1500);
    } catch (err) {
      setAlert({
        message: err?.message || "Gagal menambahkan voucher",
        show: true,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md md:p-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-1 text-sm font-semibold text-primary"
        >
          <ChevronLeft size={16} /> Kembali
        </button>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 items-start gap-6 md:grid-cols-2"
        >
          {/* Kolom Kiri */}
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Kode Voucher
              </label>
              <input
                type="text"
                name="kode"
                value={form.kode}
                onChange={handleChange}
                placeholder="Masukkan Kode Voucher"
                className="w-full rounded-md border px-4 py-2"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Tipe Voucher
              </label>
              <select
                name="tipe"
                value={form.tipe}
                onChange={handleChange}
                className={`w-full rounded-md border px-4 py-2 ${
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
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Minimum Pembelian
              </label>
              <input
                type="text"
                name="minPembelian"
                value={form.minPembelian}
                onChange={handleChange}
                placeholder="Masukkan Minimum Pembelian"
                className="w-full rounded-md border px-4 py-2"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Nilai</label>
              <input
                type="text"
                name="nilai"
                value={form.nilai}
                onChange={handleChange}
                placeholder="Masukkan Nilai"
                className="w-full rounded-md border px-4 py-2"
                required
              />
            </div>
          </div>

          {/* Kolom Kanan */}
          <div className="flex h-full flex-col justify-between">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Masa Berlaku
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="date"
                  name="mulai"
                  value={form.mulai}
                  onChange={handleChange}
                  className="w-full rounded-md border px-4 py-2"
                  required
                />
                <span className="text-sm font-bold">-</span>
                <input
                  type="date"
                  name="sampai"
                  value={form.sampai}
                  onChange={handleChange}
                  className="w-full rounded-md border px-4 py-2"
                  required
                />
              </div>
            </div>

            {/* Tombol Submit */}
            <div className="mt-6 text-end md:mt-auto">
              <button
                type="submit"
                className="rounded-md bg-red-600 px-6 py-2 text-white hover:bg-red-700"
              >
                Simpan
              </button>
            </div>
          </div>
        </form>

        {alert.show && (
          <Alert
            message={alert.message}
            onConfirm={() => setAlert({ show: false, message: "" })}
            confirmText="Tutup"
          />
        )}
      </div>
    </div>
  );
};

export default AddVoucherPage;
