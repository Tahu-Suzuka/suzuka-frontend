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
import { ReportService } from "../../services/ReportService";

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
    const fetchAllYearlySales = async () => {
      let page = 1;
      let allSales = [];

      try {
        while (true) {
          const response = await ReportService.getProductSalesYearly(page);
          const sales = response?.data?.sales || [];
          allSales = [...allSales, ...sales];

          const pagination = response?.data?.pagination;
          if (!pagination?.hasNextPage) break;
          page++;
        }

        const productMap = {};

        allSales.forEach((item) => {
          const name = item.productName || "Produk Tidak Dikenal";
          const quantity = item.totalQuantitySold || 0;

          if (productMap[name]) {
            productMap[name] += quantity;
          } else {
            productMap[name] = quantity;
          }
        });

        const labels = Object.keys(productMap);
        const data = Object.values(productMap);

        setChartData({
          labels,
          datasets: [
            {
              label: "Produk Terjual",
              data,
              backgroundColor: "#DC2626",
              hoverBackgroundColor: "#FBBF24",
              borderRadius: 4,
              barThickness: 40,
            },
          ],
        });
      } catch (error) {
        console.error("Gagal mengambil data produk tahunan:", error);
      }
    };

    fetchAllYearlySales();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y} pcs`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value} pcs`,
        },
      },
    },
  };

  return chartData ? (
    <Bar data={chartData} options={options} />
  ) : (
    <p>Memuat grafik produk terjual tahun ini...</p>
  );
};

export default Chart;
