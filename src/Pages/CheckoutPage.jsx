import React, { useEffect, useState } from "react";
import { FaTicketAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdSpeakerNotes } from "react-icons/md";
import Button from "../components/atoms/Button";
import { CartService } from "../services/CartService";
import { UserService } from "../services/UserService";
import { OrderService } from "../services/OrderService";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutMode, setCheckoutMode] = useState("cart");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mode = sessionStorage.getItem("checkoutMode");
        setCheckoutMode(mode || "cart");

        if (mode === "buyNow") {
          const buyNowItems = JSON.parse(
            sessionStorage.getItem("buyNowItems") || "[]"
          );
          setCartItems(buyNowItems);
        } else {
          const cartRes = await CartService.getAll();
          setCartItems(cartRes.carts || []);
        }

        const profileRes = await UserService.getProfile();
        setProfile(profileRes.data);
      } catch (error) {
        console.error("Gagal mengambil data checkout:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      if (checkoutMode === "buyNow") {
        sessionStorage.removeItem("buyNowItems");
        sessionStorage.removeItem("checkoutMode");
        sessionStorage.removeItem("buyNowOrderId");
      }
    };
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.variation.price * item.quantity,
    0
  );
  const serviceFee = 4000;
  const discount = 0;
  const total = subtotal + serviceFee - discount;

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");

      if (checkoutMode === "cart") {
        const orderRes = await OrderService.createFromCart(token);
        const orderId = orderRes?.data?.id;
        const paymentRes = await OrderService.createPayment(orderId, token);
        const snapToken = paymentRes.token;

        window.snap.pay(snapToken, {
          onSuccess: () => (window.location.href = "/order"),
          onPending: () => (window.location.href = "/order"),
          onError: (error) => {
            console.error("Pembayaran gagal", error);
            alert("Terjadi kesalahan saat memproses pembayaran.");
          },
          onClose: () => {
            console.warn("User menutup popup tanpa menyelesaikan pembayaran");
          },
        });
      } else if (checkoutMode === "buyNow") {
        const orderId = sessionStorage.getItem("buyNowOrderId");
        if (!orderId)
          throw new Error("Order ID tidak ditemukan untuk Beli Sekarang");

        const paymentRes = await OrderService.createPayment(orderId, token);
        const snapToken = paymentRes.token;

        window.snap.pay(snapToken, {
          onSuccess: () => (window.location.href = "/orders"),
          onPending: () => (window.location.href = "/orders"),
          onError: (error) => {
            console.error("Pembayaran gagal", error);
            alert("Terjadi kesalahan saat memproses pembayaran.");
          },
          onClose: () => {
            console.warn("User menutup popup tanpa menyelesaikan pembayaran");
          },
        });
      } else {
        alert("Pesanan berhasil dibuat.");
        window.location.href = "/orders";
      }
    } catch (error) {
      console.error("Gagal memproses pembayaran:", error);
      alert(error.message || "Terjadi kesalahan saat pembayaran.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Memuat data checkout...</p>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-4 text-center">
        <p className="text-gray-500">Tidak ada produk untuk di-checkout.</p>
        <Button
          to="/"
          text="Kembali Belanja"
          className="mt-4 rounded-md px-6 py-2"
        />
      </div>
    );
  }

  const isProfileIncomplete =
    !profile?.name || !profile?.phone || !profile?.address;

  if (isProfileIncomplete) {
    return (
      <div className="max-w-3xl mx-auto text-center mt-12 bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Data diri belum lengkap
        </h2>
        <p className="text-gray-600 mb-6">
          Untuk melanjutkan checkout, silakan lengkapi data diri terlebih
          dahulu.
        </p>
        <Button
          to="/profile"
          text="Lengkapi Data Diri"
          className="rounded-md px-6 py-2"
        />
      </div>
    );
  }

  return (
    <div className="px-6 lg:px-20 mx-auto p-4 space-y-6">
      {/* Alamat Penerima */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-primary font-bold mb-2 flex items-center gap-2">
          <FaLocationDot className="text-xl" />
          Alamat Penerima
        </h2>
        <div className="border-t pt-2 text-sm text-gray-700">
          <div className="flex flex-col lg:flex-row justify-between lg:items-start">
            <div className="flex flex-row lg:flex-col gap-1">
              <p className="font-semibold">{profile.name}</p>
              <p>({profile.phone})</p>
            </div>
            <p className="mt-1 lg:mt-0 lg:text-right lg:max-w-xs break-words">
              {profile.address}
            </p>
          </div>
        </div>
      </div>

      {/* Produk */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-bold mb-4">
          {checkoutMode === "buyNow" ? "Produk yang Dipilih" : "Produk Dipesan"}
        </h2>
        <div className="space-y-2 text-sm text-gray-600">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className={`flex justify-between items-center p-3 rounded ${
                index % 2 === 1 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    item.variation.product.mainImage || "/images/default.png"
                  }
                  alt={item.variation.product.product_name}
                  className="w-12 h-12 lg:w-24 lg:h-20 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">
                    {item.variation.product.product_name}
                  </p>
                  <div className="block lg:hidden text-sm text-gray-500">
                    Ukuran: {item.variation.name}
                  </div>
                </div>
              </div>
              <div className="hidden lg:block lg:w-[130px] text-center text-gray-600">
                Ukuran: {item.variation.name}
              </div>
              <div className="flex items-center gap-8 pr-4">
                <div className="lg:w-[100px] text-center">
                  Rp {item.variation.price.toLocaleString("id-ID")}
                </div>
                <div className="lg:w-[60px] text-center">{item.quantity}x</div>
                <div className="hidden lg:block lg:w-[120px] text-right font-semibold text-gray-800">
                  Rp{" "}
                  {(item.variation.price * item.quantity).toLocaleString(
                    "id-ID"
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr className="my-4" />
        <p className="text-right font-semibold text-sm lg:text-base">
          Total Pesanan ({cartItems.length} Produk):{" "}
          <span className="text-primary">
            Rp{subtotal.toLocaleString("id-ID")}
          </span>
        </p>
      </div>

      {/* Pesan, Voucher, Ringkasan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow h-fit">
            <h2 className="text-primary font-semibold flex items-center gap-2">
              <MdSpeakerNotes /> Pesan untuk Penjual
            </h2>
            <input
              type="text"
              placeholder="Tulis pesan atau catatan untuk penjual..."
              className="border w-full px-4 py-2 mt-4 rounded text-sm"
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow h-fit">
            <h2 className="text-primary font-semibold flex items-center gap-2">
              <FaTicketAlt /> Voucher
            </h2>
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 mt-4">
              <input
                type="text"
                placeholder="Masukan kode voucher anda disini"
                className="border w-full px-4 py-2 rounded text-sm"
              />
              <Button text="Gunakan" className="rounded-md px-6 text-sm py-2" />
            </div>
          </div>
        </div>

        {/* Ringkasan Pembayaran */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="space-y-2 text-xs lg:text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal Pesanan</span>
              <span>Rp{subtotal.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal Pengiriman</span>
              <span>Rp0</span>
            </div>
            <div className="flex justify-between">
              <span>Biaya Layanan</span>
              <span>Rp{serviceFee.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Diskon</span>
              <span>-Rp{discount.toLocaleString("id-ID")}</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-base lg:text-lg text-red-600">
              <span>Total Pembayaran</span>
              <span>Rp{total.toLocaleString("id-ID")}</span>
            </div>
          </div>
          <div className="flex justify-end items-end pt-4 mt-4">
            <Button
              text="Lanjutkan Pembayaran"
              width="w-full"
              className="rounded-md text-sm py-2"
              onClick={handlePayment}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
