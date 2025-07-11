import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Button from "../../../components/atoms/Button";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Table from "../../../components/atoms/Table";
import Pagination from "../../../components/atoms/Pagination";
import Filter from "../../../components/atoms/Filter";
import Alert from "../../../components/atoms/Alert";
import { ProductService } from "../../../services/ProductService";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ProductDashboardPage = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const sortOptions = [
    { value: "menungguPembayaran", label: "Menunggu Pembayaran" },
    { value: "diproses", label: "Diproses" },
    { value: "dikirim", label: "Dikirim" },
    { value: "selesai", label: "Selesai" },
    { value: "dibatalkan", label: "Dibatalkan" },
  ];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await ProductService.getAll(token);
      setProducts(response.data);
    } catch (err) {
      console.error("Gagal mengambil data produk:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const confirmDelete = (id) => {
    setSelectedId(id);
    setShowAlert(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await ProductService.delete(selectedId, token);
      setProducts((prev) => prev.filter((item) => item.id !== selectedId));
    } catch (err) {
      console.error(
        "Gagal menghapus produk:",
        err.response?.data || err.message
      );
    } finally {
      setShowAlert(false);
      setSelectedId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowAlert(false);
    setSelectedId(null);
  };

  const headers = ["No", "Produk", "Kategori", "Harga", "Deskripsi", "Aksi"];

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow relative">
      {showAlert && (
        <Alert
          message="Apakah kamu yakin ingin menghapus produk ini?"
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}

      <div className="flex w-full justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Daftar Produk</h1>
        <div className="flex flex-auto justify-end gap-4">
          <Filter value={sortBy} onChange={setSortBy} options={sortOptions} />
          <Button
            width="w-52"
            className="rounded-md flex items-center justify-center gap-2 py-2"
            onClick={() => navigate("/dashboard/add-product")}
          >
            <FaPlus className="text-sm" />
            Tambah Produk
          </Button>
        </div>
      </div>

      {loading ? (
        <p className="text-center py-10 text-gray-500">Memuat data...</p>
      ) : (
        <Table headers={headers}>
          {products.map((item, idx) => (
            <tr key={item.id} className="border-t">
              <td className="py-2 px-4">{idx + 1}</td>
              <td className="py-2 px-4">
                <div className="flex items-center gap-3">
                  <LazyLoadImage
                    src={item.mainImage}
                    alt={item.product_name}
                    className="w-10 h-10 object-cover rounded"
                    effect="blur"
                  />
                  <span className="text-sm font-medium text-gray-800">
                    {item.product_name}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4">
                {item.category?.category_name || "-"}
              </td>
              <td className="py-2 px-4">
                {item.variations?.[0]?.price
                  ? `Rp${item.variations[0].price.toLocaleString("id-ID")}`
                  : "-"}
              </td>
              <td className="py-2 px-4 max-w-xs">
                <p
                  className="truncate text-sm text-gray-700"
                  title={item.description}
                >
                  {item.description}
                </p>
              </td>
              <td className="py-2 px-4 flex gap-3">
                <button
                  className="text-green-500 hover:text-green-700"
                  onClick={() => navigate(`/dashboard/edit-product/${item.id}`)}
                >
                  <FiEdit className="w-5 h-5" />
                </button>
                <button
                  className="text-primary hover:text-red-800"
                  onClick={() => confirmDelete(item.id)}
                >
                  <MdDelete className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </Table>
      )}

      <Pagination />
    </div>
  );
};

export default ProductDashboardPage;
