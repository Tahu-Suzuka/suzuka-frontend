import React, { useEffect, useState } from "react";
import { FaUsers, FaStar } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { TbFileInvoice } from "react-icons/tb";
import Chart from "../../components/atoms/Chart";
import Stat from "../../components/atoms/Stat";
import OrderTable from "../../components/organisms/dashboard/OrderTable";
import { OrderService } from "../../services/OrderService";

const DashboardPage = () => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    todaySales: 0,
    totalOrders: 0,
    totalReviews: 0,
    totalCustomers: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resOrders = await OrderService.getAllOrders();
        const allOrders = resOrders.data || [];

        setOrders(allOrders);

        const today = new Date().toISOString().slice(0, 10);
        const todaySales = allOrders.filter((order) =>
          order.createdAt?.startsWith(today)
        ).length;

        const totalOrders = allOrders.length;
        const totalCustomers = new Set(allOrders.map((o) => o.user.id)).size;

        setStats({
          todaySales,
          totalOrders,
          totalReviews: 0,
          totalCustomers,
        });
      } catch (err) {
        console.error("Gagal memuat data dashboard:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Stat
          title="Penjualan Hari Ini"
          value={stats.todaySales}
          icon={<IoStatsChart className="text-3xl text-primary" />}
        />
        <Stat
          title="Jumlah Pesanan"
          value={stats.totalOrders}
          icon={<TbFileInvoice className="text-3xl text-primary" />}
        />
        <Stat
          title="Ulasan"
          value={stats.totalReviews}
          icon={<FaStar className="text-3xl text-primary" />}
        />
        <Stat
          title="Jumlah Pelanggan"
          value={stats.totalCustomers}
          icon={<FaUsers className="text-3xl text-primary" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Grafik Penjualan Mingguan
          </h2>
          <Chart />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Daftar Pesanan
          </h2>
          <OrderTable data={orders} showPayment={false} showAction={false} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
