import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../../services/UserService";
import Alert from "../../../components/atoms/Alert";

const AddCustomerPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.name) newErrors.name = "Nama wajib diisi";
    if (!form.email) newErrors.email = "Email wajib diisi";
    if (!form.password) newErrors.password = "Password wajib diisi";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        address: form.address,
      };

      await UserService.create(payload, token);

      setAlertMessage("Pelanggan berhasil ditambahkan!");
      setAlertVisible(true);
    } catch (err) {
      console.error("Gagal menambahkan pelanggan:", err);
      setAlertMessage("Terjadi kesalahan saat menyimpan data pelanggan.");
      setAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAlertClose = () => {
    setAlertVisible(false);
    navigate("/dashboard/customerDashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {alertVisible && (
        <Alert
          message={alertMessage}
          onConfirm={handleAlertClose}
          confirmText="Tutup"
        />
      )}

      <div className="bg-white rounded-lg p-6 md:p-10 shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="text-primary font-medium text-sm mb-6"
        >
          &lt; Kembali
        </button>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start"
        >
          {/* Kolom Kiri */}
          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Nama</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Masukan Nama Pelanggan"
                className="w-full border px-4 py-2 rounded-md"
              />
              {errors.name && (
                <p className="text-sm text-primary">{errors.name}</p>
              )}
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
              {errors.email && (
                <p className="text-sm text-primary">{errors.email}</p>
              )}
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
              {errors.password && (
                <p className="text-sm text-primary">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-1">No Hp</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
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
                name="address"
                value={form.address}
                onChange={handleChange}
                rows={5}
                placeholder="Masukan Alamat Pelanggan"
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>

            <div className="mt-6 md:mt-auto text-end">
              <button
                type="submit"
                disabled={loading}
                className={`${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary hover:bg-red-700"
                } text-white px-6 py-2 rounded-md`}
              >
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerPage;
