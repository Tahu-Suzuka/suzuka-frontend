import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const data = {
    labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
    datasets: [
      {
        label: "Penjualan",
        data: [500000, 1000000, 750000, 1250000, 950000, 800000, 600000],
        backgroundColor: "#DC2626",
        borderWidth: 1,
        hoverBackgroundColor: "#be123c",
      },
    ],
  };

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

  return <Bar data={data} options={options} />;
};

export default Chart;
