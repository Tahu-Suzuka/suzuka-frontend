import React, { useState } from "react";
import { X } from "lucide-react";
import { FaMinus, FaPlus } from "react-icons/fa";
import Button from "../../atoms/Button";
import Alert from "../../atoms/Alert";

const CartSidebar = ({ onClose }) => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Tahu Kuning",
      price: 12000,
      quantity: 1,
      image: "/images/product/header.png",
    },
  ]);

  const [showAlert, setShowAlert] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleIncrement = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    const item = items.find((item) => item.id === id);
    if (item.quantity === 1) {
      setDeleteItemId(id);
      setShowAlert(true);
    } else {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  const handleDeleteConfirmed = () => {
    setItems((prev) => prev.filter((item) => item.id !== deleteItemId));
    setShowAlert(false);
    setDeleteItemId(null);
  };

  const handleCancelDelete = () => {
    setShowAlert(false);
    setDeleteItemId(null);
  };

  return (
    <>
      {/* SIDEBAR */}
      <div className="fixed top-0 right-0 w-full lg:max-w-sm h-full bg-white shadow-lg z-50 transition-transform duration-300 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <h2 className="text-lg font-bold">Keranjang</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-4 pt-4 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-start gap-3 border-b pb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-sm">{item.name}</h3>
                  <button
                    className="text-xs text-primary hover:font-bold hover:underline"
                    onClick={() => {
                      setDeleteItemId(item.id);
                      setShowAlert(true);
                    }}
                  >
                    Hapus
                  </button>
                </div>

                <div className="flex justify-between items-center gap-4 pt-1 pb-1">
                  <select className="bg-gray-200 text-xs rounded px-2 py-1">
                    <option>Kecil</option>
                    <option>Normal</option>
                    <option>Besar</option>
                  </select>

                  <div className="flex items-center gap-2 border px-2 py-1 rounded">
                    <button onClick={() => handleDecrement(item.id)}>
                      <FaMinus className="text-xs" />
                    </button>
                    <p className="text-sm px-2">{item.quantity}</p>
                    <button onClick={() => handleIncrement(item.id)}>
                      <FaPlus className="text-xs" />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-800 font-semibold mt-1">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="px-4 pt-4 pb-3 border-t space-y-3">
          <div className="flex justify-between font-semibold text-base">
            <p>Total</p>
            <p>{formatRupiah(total)}</p>
          </div>
          <p className="text-xs text-gray-500">
            Ongkir dan Voucher diskon akan dihitung pada saat checkout.
          </p>

          <Button
            text="Lanjutkan"
            width="w-full"
            className="rounded text-sm font-semibold py-2"
          />
        </div>
      </div>

      {/* ALERT */}
      {showAlert && (
        <Alert
          // title="Hapus"
          message="Apakah Anda yakin ingin menghapus produk ini dari keranjang?"
          onCancel={handleCancelDelete}
          onConfirm={handleDeleteConfirmed}
        />
      )}
    </>
  );
};

export default CartSidebar;
