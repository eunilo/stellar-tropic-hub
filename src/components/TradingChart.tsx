import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler);

// Dados de exemplo (substituíveis por dados reais)
const exampleData = [
  { time: '2025-09-01', open: 100, high: 105, low: 98, close: 102 },
  { time: '2025-09-02', open: 102, high: 108, low: 100, close: 107 },
  { time: '2025-09-03', open: 107, high: 115, low: 105, close: 110 },
  { time: '2025-09-04', open: 110, high: 112, low: 106, close: 109 },
  { time: '2025-09-05', open: 109, high: 114, low: 107, close: 113 },
];

const labels = exampleData.map((d) => d.time);
const prices = exampleData.map((d) => d.close);

const data = {
  labels,
  datasets: [
    {
      label: 'Preço (close)',
      data: prices,
      borderColor: 'rgba(99,102,241,1)',
      backgroundColor: 'rgba(99,102,241,0.2)',
      tension: 0.3,
      fill: true,
      pointRadius: 0,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: { color: '#a3a3a3' },
      grid: { color: '#333' },
    },
    y: {
      ticks: { color: '#a3a3a3' },
      grid: { color: '#333' },
    },
  },
  plugins: {
    legend: {
      labels: { color: '#d1d4dc' },
    },
    tooltip: {
      intersect: false as const,
      mode: 'index' as const,
    },
  },
};

export const TradingChart = () => {
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Line data={data as any} options={options as any} />
    </div>
  );
};

