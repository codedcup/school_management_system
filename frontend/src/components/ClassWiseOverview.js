import React, { useState } from "react";
import { Link } from "react-router-dom";

const ClassWiseOverview = () => {
  // Mock data for demonstration
  const initialClassData = [
    {
      class: "6",
      paid: 10,
      notPaid: 5,
      expected: 1500,
      collected: 1000,
      pending: 500,
    },
    {
      class: "7",
      paid: 12,
      notPaid: 3,
      expected: 1500,
      collected: 1200,
      pending: 300,
    },
    {
      class: "8",
      paid: 13,
      notPaid: 7,
      expected: 1000,
      collected: 300,
      pending: 700,
    },
    {
      class: "9",
      paid: 11,
      notPaid: 4,
      expected: 1500,
      collected: 1100,
      pending: 400,
    },
    {
      class: "10",
      paid: 14,
      notPaid: 6,
      expected: 1500,
      collected: 1400,
      pending: 100,
    },
  ];

  // State for sorting
  const [sortColumn, setSortColumn] = useState("class");
  const [sortDirection, setSortDirection] = useState("asc");

  // Sort the data based on the selected column and direction
  const sortedData = [...initialClassData].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (a[sortColumn] > b[sortColumn]) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Handle sorting when a column header is clicked
  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>ALL CLASS OVERVIEW</h2>
      <div className='flex items-center mb-4'>
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
        <button className='ml-2 bg-red-500 text-white p-1 rounded'>
          Filters
        </button>
      </div>
      <table className='min-w-full bg-white border border-gray-300'>
        <thead>
          <tr>
            <th
              className='py-2 px-4 border-b cursor-pointer'
              onClick={() => handleSort("class")}
            >
              Class Name{" "}
              {sortColumn === "class" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th
              className='py-2 px-4 border-b cursor-pointer'
              onClick={() => handleSort("paid")}
            >
              Count of Student Paid{" "}
              {sortColumn === "paid" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th
              className='py-2 px-4 border-b cursor-pointer'
              onClick={() => handleSort("notPaid")}
            >
              Count of Student Not Paid{" "}
              {sortColumn === "notPaid" &&
                (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th
              className='py-2 px-4 border-b cursor-pointer'
              onClick={() => handleSort("expected")}
            >
              Expected{" "}
              {sortColumn === "expected" &&
                (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th
              className='py-2 px-4 border-b cursor-pointer'
              onClick={() => handleSort("collected")}
            >
              Collected{" "}
              {sortColumn === "collected" &&
                (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th
              className='py-2 px-4 border-b cursor-pointer'
              onClick={() => handleSort("pending")}
            >
              Pending{" "}
              {sortColumn === "pending" &&
                (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th className='py-2 px-4 border-b'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              <td className='py-2 px-4 border-b'>{item.class}</td>
              <td className='py-2 px-4 border-b'>{item.paid}</td>
              <td className='py-2 px-4 border-b'>{item.notPaid}</td>
              <td className='py-2 px-4 border-b'>{item.expected}</td>
              <td className='py-2 px-4 border-b'>{item.collected}</td>
              <td className='py-2 px-4 border-b'>{item.pending}</td>
              <td className='py-2 px-4 border-b'>
                <Link
                  to={`/Admin/clslassdetails/${item.class}`}
                  className='bg-blue-500 text-white p-1 rounded'
                >
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
