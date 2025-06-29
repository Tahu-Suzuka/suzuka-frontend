import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import Input from "../../../components/atoms/Input";
import Button from "../../../components/atoms/Button";

const products = [
  {
    name: "Tahu Stik Kuning",
    price: 12000,
    img: "/images/hero/slider1.png",
  },
];

export default function AddOrderPage() {
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const addToCart = (product) => {
    const existing = cart.find((item) => item.name === product.name);
    if (existing) return;
    setCart([...cart, { ...product, qty: 1, size: "Kecil" }]);
  };

  const updateQty = (name, amount) => {
    setCart(
      cart.map((item) =>
        item.name === name
          ? { ...item, qty: Math.max(1, item.qty + amount) }
          : item
      )
    );
  };

  const removeFromCart = (name) => {
    setCart(cart.filter((item) => item.name !== name));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="w-full grid grid-cols-2 gap-4 items-start">
      {/* LEFT */}
      <div className="space-y-4 bg-white p-6 rounded-lg shadow">
        <Link
          to="/dashboard/order"
          className="text-primary text-sm mb-4 inline-block"
        >
          &lt; Kembali
        </Link>
        <h2 className="text-xl font-bold text-center mb-4">
          Tambahkan Pesanan
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {products.map((p) => (
            <div
              key={p.name}
              className="bg-white rounded-xl shadow p-2 flex items-center gap-4"
            >
              <img
                src={p.img}
                alt={p.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex flex-col items-center justify-center h-full">
                <span className="text-sm font-medium mb-2">{p.name}</span>
                <button
                  onClick={() => addToCart(p)}
                  className="bg-primary text-white rounded-full w-7 h-7 flex items-center justify-center"
                >
                  <FaPlus size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="space-y-2 bg-white p-6 rounded-md shadow">
        <div className="-mb-2">
          <Input
            id="name"
            label="Nama"
            placeholder="Masukkan nama lengkap"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            variant="profile"
          />
        </div>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-3 border border-gray-300 focus:outline-none rounded-md text-sm"
        >
          <option value="">Pilih Metode Pembayaran</option>
          <option value="tunai">Tunai</option>
          <option value="qris">QRIS</option>
        </select>

        {/* Cart Items */}
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-4 border-b pb-2"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-medium text-sm pb-2">{item.name}</p>
                <p className="text-xs text-gray-500 pb-2">
                  Rp{item.price.toLocaleString()}
                </p>
                <select
                  className="bg-gray-200 text-xs rounded px-2 py-1"
                  value={item.size}
                  onChange={(e) =>
                    setCart(
                      cart.map((i) =>
                        i.name === item.name
                          ? { ...i, size: e.target.value }
                          : i
                      )
                    )
                  }
                >
                  <option value="Kecil">Kecil</option>
                  <option value="Sedang">Sedang</option>
                  <option value="Besar">Besar</option>
                </select>
              </div>
              <div className="flex items-center gap-2 border px-2 py-1 rounded">
                <button onClick={() => updateQty(item.name, -1)}>
                  <FaMinus size={12} />
                </button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.name, 1)}>
                  <FaPlus size={12} />
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.name)}
                className="w-6 h-6 text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>

        {/* Total & Confirm */}
        <div className="pt-4 border-t flex items-center justify-between pb-2">
          <p className="font-semibold">Total</p>
          <p className="font-semibold">Rp{total.toLocaleString()}</p>
        </div>

        <Button className="py-2 rounded-md">Konfirmasi</Button>
      </div>
    </div>
  );
}
