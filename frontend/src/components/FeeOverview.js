import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Link } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: {
      display: true,
      color: "#1E293B",
      font: { size: 18, family: "sans-serif", weight: "bold" },
    },
  },
};

const labels = ["6", "7", "8", "9", "10"];
const data = {
  labels,
  datasets: [{ label: "Fee Amount", data: [2000, 2500, 3500, 3000, 2800], backgroundColor: "#3B82F6" }],
};

const FeeOverview = () => {
  const summaryData = { expected: 15000, collected: 9000, pending: 6000 };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-700">Fee Overview</h2>
          <div className="flex items-center space-x-3">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600">Month</label>
              <select className="border rounded px-3 py-1">
                {[
                  "January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December",
                ].map((month, index) => (
                  <option key={index} value={index + 1}>{month}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600">Year</label>
              <select className="border rounded px-3 py-1">
                {[2023, 2024, 2025].map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow">Apply Filters</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Summary Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between text-lg font-semibold">
              <span>Expected:</span> <span className="text-gray-900">₹{summaryData.expected}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-green-600">
              <span>Collected:</span> <span>₹{summaryData.collected}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-red-600">
              <span>Pending:</span> <span>₹{summaryData.pending}</span>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <Link to="/Admin/classwiseoverview" className="block bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded shadow">Class-wise Overview</Link>
            <Link to="/Admin/feesettings" className="block bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded shadow">Configure Fee Settings</Link>
            <Link to="/Admin/setreminders" className="block bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded shadow">Set Reminders</Link>
          </div>
        </div>

        {/* Chart Section */}
        <div className="md:col-span-2 bg-white shadow-lg rounded-lg p-6">
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  );
};

export default FeeOverview;