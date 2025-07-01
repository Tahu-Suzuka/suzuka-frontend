import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Button from "../../atoms/Button";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Table from "../../atoms/Table";
import SearchBar from "../../atoms/SearchBar";
import Pagination from "../../atoms/Pagination";
import Alert from "../../atoms/Alert";

const CustomerContent = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const customers = [
    {
      customer: {
        nama: "Jeon Jungkook",
        gambar: "/images/default-profile.png",
      },

      email: "jek@suzuka.com",
      telepon: "08123456789",
      jumlah: 5,
    },
  ];

  const [showAlert, setShowAlert] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const confirmDelete = (id) => {
    setSelectedId(id);
    setShowAlert(true);
  };

  const handleConfirmDelete = () => {
    setCustomers((prev) => prev.filter((item) => item.id !== selectedId));
    setShowAlert(false);
    setSelectedId(null);
  };

  const handleCancelDelete = () => {
    setShowAlert(false);
    setSelectedId(null);
  };

  const headers = ["Nama", "Email", "No. Telepon", "Jumlah Pesanan", "Aksi"];

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow ">
      {/* Toolbar */}
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

      <Table headers={headers}>
        {customers.map((customer, idx) => (
          <tr key={idx} className="border-t">
            <td className="py-2 px-4">
              <div className="flex items-center gap-3">
                <img
                  src={customer.customer.gambar}
                  alt={customer.customer.nama}
                  className="w-10 h-10 object-cover rounded"
                />
                <span className="text-sm font-medium text-gray-800">
                  {customer.customer.nama}
                </span>
              </div>
            </td>
            <td className="py-2 px-4">{customer.email}</td>
            <td className="py-2 px-4">{customer.telepon}</td>
            <td className="py-2 px-4">{customer.jumlah}</td>
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
