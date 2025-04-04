import React, { useState, useEffect, useRef } from "react";
import { CChart } from "@coreui/react-chartjs";

const CustomChart = ({ studentData }) => {
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!studentData || !studentData.attendance) {
      setChartData(null);
      return;
    }

    const sortedDates = Object.keys(studentData.attendance).sort();
    const datasetValues = sortedDates.map((date) => studentData.attendance[date].questionsSolved || 0);

    setChartData({
      labels: sortedDates,
      datasets: [
        {
          label: "Questions Solved",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          data: datasetValues,
          fill: true,
        },
      ],
    });
  }, [studentData]);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.options.plugins.tooltip = { enabled: false };
      chartRef.current.options.interaction = { mode: "none" };
      chartRef.current.update();
    }
  }, [chartData]);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { labels: { color: "black", font: { size: 12 } } },
      tooltip: { enabled: false },
    },
    scales: {
      x: { grid: { color: "rgba(200, 200, 200, 0.2)" }, ticks: { color: "black", font: { size: 10 } } },
      y: { grid: { color: "rgba(200, 200, 200, 0.2)" }, ticks: { color: "black", font: { size: 10 } }, beginAtZero: true },
    },
    interaction: {
      mode: "none",
    },
  };

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-md p-2 sm:p-4">
      {chartData ? (
        <div className="relative w-full h-full">
          <CChart
            type="line"
            data={chartData}
            options={options}
            ref={chartRef}
            className="w-full h-48 sm:h-64 lg:h-80"
          />
        </div>
      ) : (
        <p className="text-gray-500 text-sm sm:text-base text-center">No data available for this student</p>
      )}
    </div>
  );
};

export default CustomChart;