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
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      //text: 'Classes trend chart',
      color: "red",
      font: {
        size: 16,
        family: "sans-serif",
        style: "normal",
        lineHeight: 1.2,
      },
    },
  },
};

const labels = ["6", "7", "8", "9", "10"];

const data = {
  labels,
  datasets: [
    {
      label: "Fee Amount",
      data: [2000, 2500, 3500, 3000, 2800],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
    },
  ],
};

const FeeOverview = () => {
  const summaryData = {
    expected: 15000,
    collected: 9000,
    pending: 6000,
  };

  return (
    <div className='p-4'>
      <div className='flex items-center mb-4'>
        <h2 className='text-3xl font-bold'>FEE OVERVIEW</h2>
        <div className='ml-auto flex items-center'>
          <span className='mr-2'>Month:</span>
          <select className='border p-1'>
            <option value='1'>January</option>
            <option value='2'>February</option>
            <option value='3'>March</option>
            <option value='4'>April</option>
            <option value='5'>May</option>
            <option value='6'>June</option>
            <option value='7'>July</option>
            <option value='8'>August</option>
            <option value='9'>September</option>
            <option value='10'>October</option>
            <option value='11'>November</option>
            <option value='12'>December</option>
          </select>
          <span className='mx-2'>Year:</span>
          <select className='border p-1'>
            <option value='2023'>2023</option>
            <option value='2024'>2024</option>
            <option value='2025'>2025</option>
          </select>
          <button className='ml-2 bg-blue-500 text-white p-1 rounded'>
            Apply Filters
          </button>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <div className='col-span-1 flex flex-col border gap-5 p-4'>
          <div className='flex justify-between flex-col border gap-3 mb-4'>
            <span className=' text-lg font-semibold'>
              Expected: {summaryData.expected}
            </span>
            <span className=' text-lg font-bold'>
              Collected: {summaryData.collected}
            </span>
            <span className=' text-lg font-bold'>
              Pending: {summaryData.pending}
            </span>
          </div>

          <div className='mt-10 flex border flex-col p-4 gap-3'>
            <Link
              to='/Admin/classwiseoverview'
              className='bg-blue-500 text-white p-2 rounded'
            >
              Class-wise overview
            </Link>
            <Link
              to='/Admin/feesettings'
              className='bg-blue-500 text-white p-1 mr-2 rounded'
            >
              Configure Fee Settings
            </Link>
            <Link
              to='/Admin/setreminders'
              className='bg-blue-500 text-white p-1 mr-2 rounded'
            >
              Set Reminders
            </Link>
          </div>
        </div>
        <div className='col-span-2'>
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  );
};

export default FeeOverview;
