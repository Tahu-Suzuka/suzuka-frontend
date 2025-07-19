import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserService } from "../../../services/UserService";
import Alert from "../../../components/atoms/Alert";

const EditCustomerPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    nama: "",
    email: "",
    noHp: "",
    alamat: "",
  });

  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await UserService.getById(id, token);
        const data = response.data;

        setForm({
          nama: data.name || "",
          email: data.email || "",
          noHp: data.phone || "",
          alamat: data.address || "",
        });
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        alert("Gagal mengambil data pelanggan.");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const payload = {
        name: form.nama,
        email: form.email,
        phone: form.noHp,
        address: form.alamat,
      };

      await UserService.update(id, payload, token);

      setAlertMessage("Pelanggan berhasil diperbarui!");
      setTimeout(() => {
        navigate("/dashboard/customerDashboard");
      }, 1500);
    } catch (error) {
      console.error("Gagal update:", error);
      setAlertMessage("Gagal memperbarui pelanggan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg p-6 md:p-10 shadow-md relative">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-50 z-10 flex items-center justify-center">
            <div className="text-sm font-medium text-gray-700">Loading...</div>
          </div>
        )}

        <button
          onClick={() => navigate(-1)}
          className="text-primary font-medium text-sm mb-6"
        >
          &lt; Kembali
        </button>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start"
          onSubmit={handleSubmit}
        >
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

            <div className="mt-6 md:mt-auto text-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-red-700"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </form>

        {alertMessage && (
          <Alert
            message={alertMessage}
            onConfirm={() => setAlertMessage("")}
            confirmText="Tutup"
          />
        )}
      </div>
    </div>
  );
};

export default EditCustomerPage;
