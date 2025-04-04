import React, { useRef, useEffect } from "react";
import { CChartPie } from "@coreui/react-chartjs";
import ChartDataLabels from "chartjs-plugin-datalabels";

const MostPracticedTopicsChart = ({ studentData }) => {
  const chartRef = useRef(null);

  const getTopTopics = () => {
    if (!studentData || !studentData.practicedTopics) {
      return { labels: ["No Data"], values: [1] };
    }

    const topicCount = {};
    Object.values(studentData.practicedTopics).flat().forEach((topic) => {
      topicCount[topic] = (topicCount[topic] || 0) + 1;
    });

    const sortedTopics = Object.entries(topicCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    const labels = sortedTopics.map(([topic]) => topic);
    const values = sortedTopics.map(([, count]) => count);

    return { labels, values };
  };

  const { labels, values } = getTopTopics();

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.options.plugins.tooltip = { enabled: false };
      chartRef.current.options.interaction = { mode: "none" };
      chartRef.current.update();
    }
  }, [labels, values]);

  return (
    <div className="bg-white p-2 sm:p-4 rounded-lg shadow-md flex flex-col items-center justify-center w-full h-full">
      <h2 className="text-lg sm:text-xl font-bold text-pink-700 mb-2 text-center">MOST PRACTICED TOPICS</h2>
      <div className="w-full h-full flex justify-center">
        <CChartPie
          data={{
            labels: labels,
            datasets: [
              {
                data: values,
                backgroundColor: ["#e5006d", "#b8005a", "#ff007a"],
              },
            ],
          }}
          options={{
            plugins: {
              legend: { display: false },
              tooltip: { enabled: false },
              datalabels: {
                color: "#fff",
                anchor: "center",
                align: "center",
                font: { weight: "bold", size: 10 },
                formatter: (value, ctx) => {
                  const total = values.reduce((acc, curr) => acc + curr, 0);
                  const percentage = ((value / total) * 100).toFixed(1) + "%";
                  return `${labels[ctx.dataIndex]}\n${percentage}`;
                },
              },
            },
            interaction: {
              mode: "none",
            },
            maintainAspectRatio: false,
            responsive: true,
          }}
          plugins={[ChartDataLabels]}
          ref={chartRef}
          className="w-40 h-40 sm:w-48 sm:h-48 lg:w-64 lg:h-64"
        />
      </div>
    </div>
  );
};

export default MostPracticedTopicsChart;