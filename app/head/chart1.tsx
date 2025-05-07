"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false, 
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Loan Statistics by Month',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June'];

const data = {
  labels,
  datasets: [
    {
      label: 'Released Loans',
      data: [500, 600, 550, 700, 800, 750],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Active Loans',
      data: [400, 450, 480, 500, 550, 600],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function Chart1() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading chart...</div>;
  }

  return (
    <div className="w-full h-72"> {/* Adjusted height for responsiveness */}
      <Bar options={options} data={data} />
    </div>
  );
}
