import React, { useEffect, useState } from "react";
import { FaUsers, FaStar } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { TbFileInvoice } from "react-icons/tb";
import Chart from "../../components/atoms/Chart";
import Stat from "../../components/atoms/Stat";
import OrderTable from "../../components/organisms/dashboard/OrderTable";
import { OrderService } from "../../services/OrderService";
import { UserService } from "../../services/UserService";
import { ReviewService } from "../../services/ReviewService";
import { ReportService } from "../../services/ReportService";

const DashboardPage = () => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    monthlyRevenue: 0,
    totalOrders: 0,
    totalReviews: 0,
    totalCustomers: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const [ordersRes, usersRes, reviewsRes, salesRes] = await Promise.all([
          OrderService.getAllOrders(),
          UserService.getAll(token),
          ReviewService.getAllReviews(),
          ReportService.getMonthlySalesData(),
        ]);

        const allOrders = ordersRes.data || [];
        const allUsers = usersRes.data || [];
        const allReviews = reviewsRes?.data || [];

        const monthlyRevenue = salesRes?.data?.totalOverallRevenue || "Rp 0";

        setOrders(allOrders);
        setStats({
          monthlyRevenue,
          totalOrders: allOrders.length,
          totalReviews: allReviews.length,
          totalCustomers: allUsers.length,
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
          title="Pendapatan Bulan Ini"
          value={stats.monthlyRevenue}
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
          <h2 className="text-lg font-bold mb-4">Grafik Penjualan Bulan Ini</h2>
          <Chart />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4">Daftar Pesanan</h2>
          <OrderTable data={orders} showPayment={false} showAction={false} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
