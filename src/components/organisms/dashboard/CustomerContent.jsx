import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Button from "../../atoms/Button";
import Table from "../../atoms/Table";
import SearchBar from "../../atoms/SearchBar";
import Pagination from "../../atoms/Pagination";
import Alert from "../../atoms/Alert";
import { UserService } from "../../../services/UserService";

const CustomerContent = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await UserService.getAll(token);
      setCustomers(res.data);
    } catch (err) {
      console.error("Gagal mengambil data pelanggan:", err);
      alert("Gagal memuat data pelanggan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const confirmDelete = (id) => {
    setSelectedId(id);
    setShowAlert(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await UserService.delete(selectedId, token);
      setCustomers((prev) => prev.filter((item) => item.id !== selectedId));
    } catch (err) {
      console.error("Gagal menghapus pelanggan:", err);
      alert("Gagal menghapus pelanggan");
    } finally {
      setShowAlert(false);
      setSelectedId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowAlert(false);
    setSelectedId(null);
  };

  const headers = ["Nama", "Email", "No. Telepon", "Jumlah Pesanan", "Aksi"];

  const filteredCustomers = customers.filter((cust) =>
    cust.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Daftar Pelanggan</h1>

        <div className="flex flex-wrap justify-end gap-4">
          <div className="w-44">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              placeholder="Cari pelanggan..."
            />
          </div>
          <Button
            width="w-52"
            className="rounded-md flex items-center justify-center gap-2 py-2"
            onClick={() => navigate("/dashboard/add-customer")}
          >
            <FaPlus className="text-sm" />
            Tambah Pelanggan
          </Button>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 py-10">Memuat data...</p>
      ) : (
        <Table headers={headers}>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id} className="border-t">
              <td className="py-2 px-4">
                <div className="flex items-center gap-3">
                  <img
                    src={customer.image || "/images/default-profile.png"}
                    alt={customer.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <span className="text-sm font-medium text-gray-800">
                    {customer.name}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4">{customer.email}</td>
              <td className="py-2 px-4">{customer.phone || "-"}</td>
              <td className="py-2 px-4">{customer.orderCount || 0}</td>
              <td className="py-2 px-4 flex gap-3">
                <button
                  className="text-green-500 hover:text-green-700"
                  onClick={() =>
                    navigate(`/dashboard/edit-customer/${customer.id}`)
                  }
                >
                  <FiEdit className="w-5 h-5" />
                </button>
                <button
                  className="text-primary hover:text-red-800"
                  onClick={() => confirmDelete(customer.id)}
                >
                  <MdDelete className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </Table>
      )}

      {/* Alert */}
      {showAlert && (
        <Alert
          title="Konfirmasi Hapus"
          message="Apakah Anda yakin ingin menghapus pelanggan ini?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default CustomerContent;
