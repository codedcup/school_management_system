import React, { useState } from "react";
import { Link } from "react-router-dom";

const ClassWiseOverview = () => {
  const initialClassData = [
    { class: "6", paid: 10, notPaid: 5, expected: 1500, collected: 1000, pending: 500 },
    { class: "7", paid: 12, notPaid: 3, expected: 1500, collected: 1200, pending: 300 },
    { class: "8", paid: 13, notPaid: 7, expected: 1000, collected: 300, pending: 700 },
    { class: "9", paid: 11, notPaid: 4, expected: 1500, collected: 1100, pending: 400 },
    { class: "10", paid: 14, notPaid: 6, expected: 1500, collected: 1400, pending: 100 },
  ];

  const [sortColumn, setSortColumn] = useState("class");
  const [sortDirection, setSortDirection] = useState("asc");

  const sortedData = [...initialClassData].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (column) => {
    setSortDirection(column === sortColumn && sortDirection === "asc" ? "desc" : "asc");
    setSortColumn(column);
  };

  return (
    <div className='p-6 bg-gray-100 rounded-lg shadow-md'>
      <h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>Class Fee Overview</h2>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <label className='mr-2 font-semibold'>Month:</label>
          <select className='border p-2 rounded'>
            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => (
              <option key={index} value={index + 1}>{month}</option>
            ))}
          </select>
          <label className='mx-2 font-semibold'>Year:</label>
          <select className='border p-2 rounded'>
            {[2023, 2024, 2025].map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition'>Apply Filters</button>
      </div>
      <table className='w-full bg-white shadow-md rounded-lg overflow-hidden'>
        <thead className='bg-blue-500 text-white'>
          <tr>
            {['Class', 'Paid', 'Not Paid', 'Expected', 'Collected', 'Pending'].map((header, index) => (
              <th
                key={index}
                className='py-3 px-4 text-left cursor-pointer hover:bg-blue-600'
                onClick={() => handleSort(header.toLowerCase().replace(' ', ''))}
              >
                {header} {sortColumn === header.toLowerCase().replace(' ', '') && (sortDirection === "asc" ? "▲" : "▼")}
              </th>
            ))}
            <th className='py-3 px-4 text-left'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index} className='border-b hover:bg-gray-100'>
              <td className='py-3 px-4'>{item.class}</td>
              <td className='py-3 px-4'>{item.paid}</td>
              <td className='py-3 px-4'>{item.notPaid}</td>
              <td className='py-3 px-4'>{item.expected}</td>
              <td className='py-3 px-4'>{item.collected}</td>
              <td className='py-3 px-4'>{item.pending}</td>
              <td className='py-3 px-4'>
                <Link to={`/Admin/clslassdetails/${item.class}`} className='bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition'>
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassWiseOverview;
