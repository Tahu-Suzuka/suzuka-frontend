const latestOrders = [
  { no: "#202501", pelanggan: "Ahmad", total: "Rp120.000", status: "Dikirim" },
  { no: "#202502", pelanggan: "Siti", total: "Rp85.000", status: "Selesai" },
  {
    no: "#202503",
    pelanggan: "Rudi",
    total: "Rp200.000",
    status: "Dibatalkan",
  },
  {
    no: "#202504",
    pelanggan: "Nina",
    total: "Rp55.000",
    status: "Sedang Diproses",
  },
  { no: "#202505", pelanggan: "Fajar", total: "Rp99.000", status: "Dikirim" },
];

const Table = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Pesanan Terbaru</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="py-2">No. Pesanan</th>
              <th className="py-2">Pelanggan</th>
              <th className="py-2">Total</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {latestOrders.map((order, index) => (
              <tr key={index} className="border-b last:border-b-0">
                <td className="py-2">{order.no}</td>
                <td className="py-2">{order.pelanggan}</td>
                <td className="py-2">{order.total}</td>
                <td className="py-2">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      order.status === "Dikirim"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "Selesai"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Dibatalkan"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-right">
        <button className="text-sm text-primary font-medium hover:underline">
          Lihat Semua Pesanan
        </button>
      </div>
    </div>
  );
};

export default Table;
