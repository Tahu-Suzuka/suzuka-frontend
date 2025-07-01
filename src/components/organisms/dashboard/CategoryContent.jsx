import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Button from "../../atoms/Button";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Table from "../../atoms/Table";
import Alert from "../../atoms/Alert";

const CategoryContent = () => {
  const navigate = useNavigate();
  const categories = [
    {
      gambar: "/images/no-order.png",
      nama: "Tahu Kuning",
    },
  ];

  const [showAlert, setShowAlert] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const confirmDelete = (id) => {
    setSelectedId(id);
    setShowAlert(true);
  };

  const handleConfirmDelete = () => {
    setCategories((prev) => prev.filter((item) => item.id !== selectedId));
    setShowAlert(false);
    setSelectedId(null);
  };

  const handleCancelDelete = () => {
    setShowAlert(false);
    setSelectedId(null);
  };

  const headers = ["Gambar", "Nama", "Aksi"];

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow">
      {showAlert && (
        <Alert
          message="Apakah kamu yakin ingin menghapus produk ini?"
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
      {/* Toolbar */}
      <div className="flex w-full justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Daftar Kategori</h1>
        <div className="flex flex-wrap justify-end gap-4">
          <Button
            width="w-44"
            className="rounded-md flex items-center justify-center gap-2 py-2"
            onClick={() => navigate("/dashboard/add-category")}
          >
            <FaPlus className="text-sm" />
            Tambah Kategori
          </Button>
        </div>
      </div>

      <Table headers={headers}>
        {categories.map((category, idx) => (
          <tr key={idx} className="border-t">
            <td className="py-2 px-4">
              <div className="flex items-center gap-3">
                <img
                  src={category.gambar}
                  alt={category.nama}
                  className="w-10 h-10 object-cover rounded"
                />
              </div>
            </td>
            <td className="py-2 px-4">{category.nama}</td>
            <td className="py-2 px-4 flex gap-3">
              <button
                className="text-green-500 hover:text-green-700"
                onClick={() => navigate(`/dashboard/edit-category/${idx}`)}
              >
                <FiEdit className="w-5 h-5" />
              </button>
              <button
                className="text-primary hover:text-red-800"
                onClick={() => confirmDelete(category.id)}
              >
                <MdDelete className="w-5 h-5" />
              </button>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default CategoryContent;
