import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ClassDetails = () => {
  const { classId } = useParams();

  const students = [
    { id: 1, name: 'John Doe', feeDue: 1000, paymentDate: '2023-10-15', status: 'Paid' },
    { id: 2, name: 'Jane Smith', feeDue: 1000, paymentDate: null, status: 'Unpaid' },
    { id: 3, name: 'Alice Johnson', feeDue: 1000, paymentDate: '2023-10-20', status: 'Paid' },
    { id: 4, name: 'Bob Brown', feeDue: 1000, paymentDate: '2023-10-18', status: 'Paid' },
    { id: 5, name: 'Charlie Davis', feeDue: 1000, paymentDate: null, status: 'Unpaid' },
  ];

  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const sortedStudents = [...students].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleDetailsClick = (student) => {
    setSelectedStudent(student);
  };

  const closeModal = () => {
    setSelectedStudent(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Class {classId} Overview</h2>
      <div className="flex items-center mb-6 gap-4">
        <select className="border p-2 rounded">
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
          ))}
        </select>
        <select className="border p-2 rounded">
          {[2023, 2024, 2025].map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <select className="border p-2 rounded">
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
        <input type="text" placeholder="Search Student" className="border p-2 rounded" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Filter</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-500 text-white">
              {['ID', 'Name', 'Fee Due', 'Payment Date', 'Status'].map((col, index) => (
                <th key={index} className="py-3 px-4 cursor-pointer" onClick={() => handleSort(col.toLowerCase().replace(' ', ''))}>
                  {col} {sortColumn === col.toLowerCase().replace(' ', '') && (sortDirection === 'asc' ? '▲' : '▼')}
                </th>
              ))}
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedStudents.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4">{student.id}</td>
                <td className="py-3 px-4">{student.name}</td>
                <td className="py-3 px-4">₹{student.feeDue}</td>
                <td className="py-3 px-4">{student.paymentDate || 'N/A'}</td>
                <td className="py-3 px-4 font-semibold" style={{ color: student.status === 'Paid' ? 'green' : 'red' }}>{student.status}</td>
                <td className="py-3 px-4">
                  <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => handleDetailsClick(student)}>Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Student Details</h2>
            <p><strong>Name:</strong> {selectedStudent.name}</p>
            <p><strong>Payment Date:</strong> {selectedStudent.paymentDate || 'N/A'}</p>
            <p><strong>Class:</strong> {classId}</p>
            <p><strong>Payment Mode:</strong> Online</p>
            <p><strong>Amount Paid:</strong> ₹{selectedStudent.feeDue}</p>
            <p><strong>Pending Amount:</strong> {selectedStudent.status === 'Paid' ? '₹0' : `₹${selectedStudent.feeDue}`}</p>
            <p><strong>Previous Pending Fees:</strong> ₹500 (example)</p>
            <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassDetails;
