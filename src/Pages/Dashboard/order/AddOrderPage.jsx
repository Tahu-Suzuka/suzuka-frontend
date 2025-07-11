import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import Input from "../../../components/atoms/Input";
import Button from "../../../components/atoms/Button";
import { ProductService } from "../../../services/ProductService";
import { OrderService } from "../../../services/OrderService";
import { getAuthToken } from "../../../services/getAuthToken";
import Alert from "../../../components/atoms/Alert";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function AddOrderPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const token = getAuthToken();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getAll();
        const mapped = data.data.map((item) => ({
          ...item,
          price: item.price ?? 0,
          img: item.mainImage ? item.mainImage : "/images/default.png",
        }));
        setProducts(mapped);
      } catch (error) {
        console.error("Gagal ambil produk:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (alert) {
      const timeout = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [alert]);

  useEffect(() => {
    if (!customerName) {
      setSuggestions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.tahusuzuka.shop/users?name=${encodeURIComponent(
            customerName
          )}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        const query = customerName.toLowerCase();
        const sorted = (data.data || []).sort((a, b) => {
          const aName = a.name.toLowerCase();
          const bName = b.name.toLowerCase();
          const aStarts = aName.startsWith(query);
          const bStarts = bName.startsWith(query);
          if (aStarts && !bStarts) return -1;
          if (!aStarts && bStarts) return 1;
          const aIndex = aName.indexOf(query);
          const bIndex = bName.indexOf(query);
          if (aIndex !== bIndex) return aIndex - bIndex;
          return aName.localeCompare(bName);
        });
        setSuggestions(sorted);
      } catch (err) {
        console.error("Gagal ambil saran nama:", err);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [customerName, token]);

  const addToCart = (product) => {
    const variation = product.variations?.[0];
    if (!variation) return;

    const existing = cart.find(
      (item) => item.id === product.id && item.size === variation.name
    );
    if (existing) return;

    setCart([
      ...cart,
      {
        ...product,
        qty: 1,
        size: variation.name,
        price: variation.price,
        variationId: variation.id,
      },
    ]);
  };

  const updateQty = (id, size, amount) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.size === size
          ? { ...item, qty: Math.max(1, item.qty + amount) }
          : item
      )
    );
  };

  const removeFromCart = (id, size) => {
    setCart(cart.filter((item) => !(item.id === id && item.size === size)));
  };

  const total = cart.reduce(
    (acc, item) => acc + (item.price ?? 0) * item.qty,
    0
  );

  const handleSubmit = async () => {
    if (!selectedUserId || cart.length === 0 || !paymentMethod) {
      setAlert({ type: "danger", message: "Lengkapi semua field!" });
      return;
    }

    const payload = {
      userId: selectedUserId,
      items: cart.map((i) => ({
        variationId: i.variationId,
        quantity: i.qty,
      })),
      note,
      paymentMethod: paymentMethod === "tunai" ? "Cash" : "QRIS",
    };

    try {
      setLoading(true);
      const res = await OrderService.createManualOrder(payload, token);
      console.log("Res:", res);
      setShowAlert(true); // ✅ Ini yang bikin alert muncul
    } catch (er) {
      console.error(er);
      setAlert({ type: "danger", message: "Gagal membuat pesanan!" });
    } finally {
      setLoading(false);
    }
  };

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
              key={p.id}
              className="bg-white rounded-xl shadow p-2 flex items-center gap-4"
            >
              <LazyLoadImage
                src={p.img}
                alt={p.product_name}
                className="w-16 h-16 object-cover rounded-md"
                effect="blur"
              />
              <div className="flex flex-col items-center justify-center h-full">
                <span className="text-sm font-medium mb-2">
                  {p.product_name}
                </span>
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
      <div className="space-y-2 bg-white p-6 rounded-md shadow relative">
        {alert && <Alert type={alert.type}>{alert.message}</Alert>}

        <div className="relative">
          <Input
            id="name"
            label="Nama Pelanggan"
            placeholder="Masukkan Nama Pelanggan"
            value={customerName}
            onChange={(e) => {
              setCustomerName(e.target.value);
              setSelectedUserId("");
            }}
            variant="profile"
            autoComplete="off"
          />
          {suggestions.length > 0 && !selectedUserId && (
            <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded shadow">
              {suggestions.map((user) => (
                <li
                  key={user.id}
                  onClick={() => {
                    setCustomerName(user.name);
                    setSelectedUserId(user.id);
                    setSuggestions([]);
                  }}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {user.name}
                </li>
              ))}
            </ul>
          )}
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

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Tulis catatan pesanan (opsional)"
          className="w-full border border-gray-300 p-2 rounded-md text-sm resize-none"
          rows={3}
        />

        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id + item.size}
              className="flex items-center gap-4 border-b pb-2"
            >
              <LazyLoadImage
                src={item.img}
                alt={item.product_name}
                className="w-16 h-16 object-cover rounded"
                effect="blur"
              />
              <div className="flex-1">
                <p className="font-medium text-sm pb-2">{item.product_name}</p>
                <p className="text-xs text-gray-500 pb-2">
                  Rp{Number(item.price || 0).toLocaleString()}
                </p>
                <select
                  className="bg-gray-200 text-xs rounded px-2 py-1"
                  value={item.size}
                  onChange={(e) =>
                    setCart(
                      cart.map((i) =>
                        i.id === item.id && i.size === item.size
                          ? {
                              ...i,
                              size: e.target.value,
                              price:
                                i.variations?.find(
                                  (v) => v.name === e.target.value
                                )?.price ?? i.price,
                            }
                          : i
                      )
                    )
                  }
                >
                  {item.variations?.map((v) => (
                    <option key={v.id} value={v.name}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2 border px-2 py-1 rounded">
                <button onClick={() => updateQty(item.id, item.size, -1)}>
                  <FaMinus size={12} />
                </button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.size, 1)}>
                  <FaPlus size={12} />
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id, item.size)}
                className="w-6 h-6 text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t flex items-center justify-between pb-2">
          <p className="font-semibold">Total</p>
          <p className="font-semibold">
            Rp{Number(total || 0).toLocaleString()}
          </p>
        </div>

        <Button
          className="py-2 rounded-md"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Memproses..." : "Konfirmasi"}
        </Button>
      </div>

      {showAlert && (
        <Alert
          message="Pesanan berhasil ditambahkan!"
          onConfirm={() => navigate("/dashboard/order")}
          confirmText="OK"
        />
      )}
    </div>
  );
}
