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
import { API_URL } from "../../services/API";

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
    const fetchChartData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${API_URL}/reports/product-sales?period=week`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const json = await res.json();

        const labels = json?.data?.sales?.map(
          (item) => `${item.productName} (${item.variationName})`
        );

        const revenues = json?.data?.sales?.map(
          (item) => Number(item.totalRevenueRaw) || 0
        );

        setChartData({
          labels,
          datasets: [
            {
              label: "Pendapatan",
              data: revenues,
              backgroundColor: "#DC2626",
              borderWidth: 1,
              hoverBackgroundColor: "#be123c",
            },
          ],
        });
      } catch (err) {
        console.error("Gagal memuat data chart:", err);
      }
    };

    fetchChartData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.parsed.y;
            return `Rp ${value.toLocaleString("id-ID")}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `Rp ${value.toLocaleString("id-ID")}`;
          },
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
