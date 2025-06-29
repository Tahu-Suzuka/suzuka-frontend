import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const ReadOrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dummyOrders = {
    202506: {
      customer: "Siti",
      address: "Jalan",
      phone: "08xxxxxxx",
      date: "24-06-2025",
      status: "Diproses",
      payment: "QRIS",
      items: [
        { nama: "Tahu Kuning", variasi: "Kecil", jumlah: 2, harga: 12000 },
        { nama: "Tahu Kuning", variasi: "Besar", jumlah: 2, harga: 14000 },
        { nama: "Kerupuk Tahu", variasi: "500gr", jumlah: 2, harga: 25000 },
        { nama: "Tahu Stik Putih", variasi: "Normal", jumlah: 1, harga: 13000 },
      ],
    },
  };
  const order = dummyOrders[id];

  if (!order) {
    return <div>Pesanan dengan ID {id} tidak ditemukan.</div>;
  }

  const subtotal = order.items.reduce(
    (sum, item) => sum + item.jumlah * item.harga,
    0
  );
  const serviceFee = 5000;
  const total = subtotal + serviceFee;

  return (
    <div className="  min-h-screen">
      <div className="bg-white rounded-xl shadow-md p-6 md:p-10">
        <button
          onClick={() => navigate(-1)}
          className="text-primary font-medium text-sm mb-6"
        >
          &lt; Kembali
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 text-sm mb-6">
          <div className="space-y-2">
            {/* Kolom kiri */}
            <div className="flex">
              <span className="w-32 font-semibold">Nama</span>
              <span>: {order.customer}</span>
            </div>
            <div className="flex">
              <span className="w-32 font-semibold">Alamat</span>
              <span>: {order.address}</span>
            </div>
            <div className="flex">
              <span className="w-32 font-semibold">No Handphone</span>
              <span>: {order.phone}</span>
            </div>
          </div>

          <div className="space-y-2 mt-4 md:mt-0 ml-auto">
            <div className="flex">
              <span className="w-40 font-semibold">Tanggal Pesanan</span>
              <span>: {order.date}</span>
            </div>
            <div className="flex">
              <span className="w-40 font-semibold">No Pesanan</span>
              <span>: {id}</span>
            </div>
            <div className="flex">
              <span className="w-40 font-semibold">Status Pesanan</span>
              <span>: {order.status}</span>
            </div>
            <div className="flex">
              <span className="w-40 font-semibold">Metode Pembayaran</span>
              <span>: {order.payment}</span>
            </div>
          </div>
        </div>

        <table className="w-full text-sm  ">
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
            {order.items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{index + 1}</td>
                <td className="py-2">{item.nama}</td>
                <td className="py-2">{item.variasi}</td>
                <td className="py-2">{item.jumlah}</td>
                <td className="py-2">Rp{item.harga.toLocaleString("id-ID")}</td>
                <td className="py-2">
                  Rp{(item.harga * item.jumlah).toLocaleString("id-ID")}
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
