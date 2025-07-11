import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { OrderService } from "../../services/OrderService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await OrderService.getAllOrders();
        const orders = res.data || [];

        console.log("Orders:", orders);

        const dayLabels = [
          "Senin",
          "Selasa",
          "Rabu",
          "Kamis",
          "Jumat",
          "Sabtu",
          "Minggu",
        ];

        const salesPerDay = Object.fromEntries(
          dayLabels.map((day) => [day, 0])
        );

        orders.forEach((order) => {
          const dateStr = order.createdAt || order.orderDate;
          if (!dateStr) return;

          const orderDate = new Date(dateStr);
          const dayIndex = orderDate.getDay();
          const label = dayLabels[(dayIndex + 6) % 7];

          const totalQty = Array.isArray(order.items)
            ? order.items.reduce((sum, item) => sum + item.quantity, 0)
            : 0;

          salesPerDay[label] += totalQty;
        });

        const labels = dayLabels;
        const data = labels.map((day) => salesPerDay[day]);

        setChartData({
          labels,
          datasets: [
            {
              label: "Produk Terjual",
              data,
              backgroundColor: "#DC2626",
              hoverBackgroundColor: "#FBBF24",
              borderRadius: 4,
              barThickness: 30,
            },
          ],
        });
      } catch (err) {
        console.error("Gagal memuat data chart:", err);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y} pcs`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        precision: 0,
        ticks: {
          callback: (value) => `${value} pcs`,
        },
      },
    },
  };

  return chartData ? (
    <Bar data={chartData} options={options} />
  ) : (
    <p>Memuat grafik...</p>
  );
};

export default Chart;
