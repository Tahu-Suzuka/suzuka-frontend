import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { OrderService } from "../../../services/OrderService";

const ReadOrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await OrderService.getByIdAdmin(id);
        setOrder(res.data);
      } catch (err) {
        console.error("Gagal mengambil data pesanan:", err);
        setError("Pesanan tidak ditemukan.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <div>Memuat data pesanan...</div>;
  if (error || !order) return <div>{error || "Pesanan tidak ditemukan."}</div>;

  const subtotal = order.subtotal || 0;
  const serviceFee = order.serviceFee || 0;
  const total = order.totalPayment || 0;

  return (
    <div className="min-h-screen">
      <div className="bg-white rounded-xl shadow-md p-6 md:p-10">
        <button
          onClick={() => navigate(-1)}
          className="text-primary font-medium text-sm mb-6"
        >
          &lt; Kembali
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 text-sm mb-6">
          <div className="space-y-2">
            <div className="flex">
              <span className="w-32 font-semibold">Nama</span>
              <span>: {order.user?.name || "-"}</span>
            </div>
            <div className="flex">
              <span className="w-32 font-semibold">Alamat</span>
              <span>: {order.user?.address || "-"}</span>
            </div>
            <div className="flex">
              <span className="w-32 font-semibold">No Handphone</span>
              <span>: {order.user?.phone || "-"}</span>
            </div>
          </div>

          <div className="space-y-2 mt-4 md:mt-0 ml-auto">
            <div className="flex">
              <span className="w-40 font-semibold">Tanggal Pesanan</span>
              <span>
                : {new Date(order.orderDate).toLocaleDateString("id-ID")}
              </span>
            </div>
            <div className="flex">
              <span className="w-40 font-semibold">No Pesanan</span>
              <span>: {order.id?.slice(0, 6)}</span>
            </div>
            <div className="flex">
              <span className="w-40 font-semibold">Status Pesanan</span>
              <span>: {order.orderStatus}</span>
            </div>
            <div className="flex">
              <span className="w-40 font-semibold">Metode Pembayaran</span>
              <span>: {order.paymentMethod || "-"}</span>
            </div>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black">
              <th className="py-2 text-left">No</th>
              <th className="py-2 text-left">Nama Produk</th>
              <th className="py-2 text-left">Variasi</th>
              <th className="py-2 text-left">Jumlah</th>
              <th className="py-2 text-left">Harga</th>
              <th className="py-2 text-left">Total Harga</th>
            </tr>
          </thead>
          <tbody>
            {(order.items || []).map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{index + 1}</td>
                <td className="py-2">
                  {item.variation?.product?.product_name}
                </td>
                <td className="py-2">{item.variation?.name}</td>
                <td className="py-2">{item.quantity}</td>
                <td className="py-2">Rp{item.price.toLocaleString("id-ID")}</td>
                <td className="py-2">
                  Rp{(item.price * item.quantity).toLocaleString("id-ID")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 flex flex-col items-end text-sm gap-2">
          <div className="flex w-64 justify-between">
            <span>Subtotal</span>
            <span>Rp{subtotal.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex w-64 justify-between">
            <span>Biaya Layanan</span>
            <span>Rp{serviceFee.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex w-64 justify-between font-semibold text-base">
            <span>Total</span>
            <span>Rp{total.toLocaleString("id-ID")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadOrderPage;
