import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTicketAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdSpeakerNotes } from "react-icons/md";
import Button from "../components/atoms/Button";
import Alert from "../components/atoms/Alert";
import { CartService } from "../services/CartService";
import { UserService } from "../services/UserService";
import { OrderService } from "../services/OrderService";
import { VoucherService } from "../services/VoucherService";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutMode, setCheckoutMode] = useState("cart");
  const [profile, setProfile] = useState(null);
  const [showCloseAlert, setShowCloseAlert] = useState(false);
  const [note, setNote] = useState("");

  const [voucherCode, setVoucherCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [voucherError, setVoucherError] = useState("");

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (cartItems.length > 0) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [cartItems]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const mode = sessionStorage.getItem("checkoutMode");
        setCheckoutMode(mode || "cart");
        let itemsToSet = [];
        if (mode === "buyNow") {
          itemsToSet = JSON.parse(
            sessionStorage.getItem("buyNowItems") || "[]"
          );
        } else {
          const cartRes = await CartService.getAll();
          itemsToSet = cartRes.carts || [];
        }
        setCartItems(itemsToSet);
        const profileRes = await UserService.getProfile();
        setProfile(profileRes);
      } catch (error) {
        console.error("Gagal mengambil data checkout:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.variation?.price || 0) * item.quantity,
    0
  );
  const serviceFee = 4000;
  const total = subtotal + serviceFee - discount;

  const handleApplyVoucher = async () => {
    setVoucherError("");
    if (!voucherCode.trim()) {
      setVoucherError("Kode voucher tidak boleh kosong.");
      return;
    }

    try {
      const response = await VoucherService.applyVoucher(voucherCode);
      const voucherData = response.data;

      if (subtotal < voucherData.minPurchase) {
        throw new Error(
          `Minimal pembelian untuk voucher ini adalah Rp${voucherData.minPurchase.toLocaleString(
            "id-ID"
          )}`
        );
      }

      setDiscount(voucherData.value);
      setAppliedVoucher(voucherData);
      setVoucherError("");
    } catch (error) {
      setDiscount(0);
      setAppliedVoucher(null);
      setVoucherError(error.message);
    }
  };

  const handleRemoveVoucher = () => {
    setVoucherCode("");
    setDiscount(0);
    setAppliedVoucher(null);
    setVoucherError("");
  };

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");
      let orderId;

      const payload = {
        items: cartItems.map((item) => ({
          variationId: item.variation.id,
          quantity: item.quantity,
        })),
        note: note,
        voucher: appliedVoucher ? appliedVoucher.code : null,
      };

      if (checkoutMode === "cart") {
        const orderRes = await OrderService.createFromCart(payload, token);
        orderId = orderRes?.data?.id;
      } else {
        const orderRes = await OrderService.createBuyNowOrder(payload);
        orderId = orderRes?.data?.id;
      }

      if (!orderId) throw new Error("Gagal membuat pesanan.");

      const paymentRes = await OrderService.createPayment(orderId, token);
      const snapToken = paymentRes.token;

      window.snap.pay(snapToken, {
        onSuccess: () =>
          navigate("/profile", {
            state: { initialMenu: "pesanan", initialTab: "Diproses" },
          }),
        onPending: () =>
          navigate("/profile", {
            state: {
              initialMenu: "pesanan",
              initialTab: "Menunggu Pembayaran",
            },
          }),
        onError: () => alert("Pembayaran gagal."),
        onClose: () => setShowCloseAlert(true),
      });
    } catch (error) {
      alert(
        error.response?.data?.message || "Terjadi kesalahan saat pembayaran."
      );
    }
  };

  const handleClosePaymentAlert = () => {
    setShowCloseAlert(false);
    navigate("/profile", {
      state: { initialMenu: "pesanan", initialTab: "Menunggu Pembayaran" },
    });
  };

  if (loading) {
    return (
      <p className="text-center text-gray-500 py-10">Memuat data checkout...</p>
    );
  }

  if (!profile?.name || !profile?.phone || !profile?.address) {
    return (
      <div className="max-w-3xl mx-auto text-center mt-12 bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Data diri belum lengkap
        </h2>
        <p className="text-gray-600 mb-6">
          Untuk melanjutkan checkout, silakan lengkapi data diri terlebih dahulu
          pada halaman profil.
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
      {showCloseAlert && (
        <Alert
          message="Anda menutup popup tanpa menyelesaikan pembayaran."
          confirmText="Lihat Pesanan"
          onConfirm={handleClosePaymentAlert}
        />
      )}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-primary font-bold mb-2 flex items-center gap-2">
          <FaLocationDot className="text-xl" /> Alamat Penerima
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow h-fit">
            <h2 className="text-primary font-semibold flex items-center gap-2">
              <MdSpeakerNotes /> Pesan untuk Penjual
            </h2>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Tulis pesan atau catatan..."
              className="border w-full px-4 py-2 mt-4 rounded text-sm"
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow h-fit">
            <h2 className="text-primary font-semibold flex items-center gap-2">
              <FaTicketAlt /> Voucher
            </h2>
            {!appliedVoucher ? (
              <>
                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 mt-4">
                  <input
                    type="text"
                    value={voucherCode}
                    onChange={(e) =>
                      setVoucherCode(e.target.value.toUpperCase())
                    }
                    placeholder="Masukan kode voucher"
                    className="border w-full px-4 py-2 rounded text-sm"
                  />
                  <Button
                    text="Gunakan"
                    onClick={handleApplyVoucher}
                    className="rounded-md px-6 text-sm py-2"
                  />
                </div>
                {voucherError && (
                  <p className="text-red-500 text-xs mt-2">{voucherError}</p>
                )}
              </>
            ) : (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-700 font-semibold">
                  Voucher "{appliedVoucher.code}" berhasil digunakan!
                </p>
                <button
                  onClick={handleRemoveVoucher}
                  className="text-xs text-red-500 hover:underline mt-1"
                >
                  Hapus
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="space-y-2 text-xs lg:text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal Pesanan</span>
              <span>Rp{subtotal.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between">
              <span>Biaya Layanan</span>
              <span>Rp{serviceFee.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between  font-medium">
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
