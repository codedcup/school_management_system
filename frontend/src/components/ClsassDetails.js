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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Class {classId} Overview</h2>
      <div className="flex items-center mb-4">
        <span className="mr-2">Month:</span>
        <select className="border p-1">
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
          ))}
        </select>
        <span className="mx-2">Year:</span>
        <select className="border p-1">
          {[2023, 2024, 2025].map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <span className="mx-2">Status:</span>
        <select className="border p-1">
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
        <input type="text" placeholder="Student Name" className="border p-1 ml-2" />
        <button className="ml-2 bg-red-500 text-white p-1 rounded">Filters</button>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            {['id', 'name', 'feeDue', 'paymentDate', 'status'].map((col) => (
              <th key={col} className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort(col)}>
                {col.charAt(0).toUpperCase() + col.slice(1)} {sortColumn === col && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
            ))}
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedStudents.map((student) => (
            <tr key={student.id}>
              <td className="py-2 px-4 border-b">{student.id}</td>
              <td className="py-2 px-4 border-b">{student.name}</td>
              <td className="py-2 px-4 border-b">{student.feeDue}</td>
              <td className="py-2 px-4 border-b">{student.paymentDate || 'N/A'}</td>
              <td className="py-2 px-4 border-b">{student.status}</td>
              <td className="py-2 px-4 border-b">
                <button className="bg-blue-500 text-white p-1 rounded" onClick={() => handleDetailsClick(student)}>
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-2">Student Details</h2>
            <p><strong>Student Name:</strong> {selectedStudent.name}</p>
            <p><strong>Date of Payment:</strong> {selectedStudent.paymentDate || 'N/A'}</p>
            <p><strong>Class:</strong> {classId}</p>
            <p><strong>Payment Mode:</strong> Online</p>
            <p><strong>Amount Paid:</strong> {selectedStudent.feeDue}</p>
            <p><strong>Amount Pending:</strong> {selectedStudent.status === 'Paid' ? 0 : selectedStudent.feeDue}</p>
            <p><strong>All Previous Month's Pending Fees:</strong> ₹500 (example)</p>
            <button className="mt-4 bg-red-500 text-white p-1 rounded" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassDetails;
