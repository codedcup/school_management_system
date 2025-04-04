import React from 'react';

function Filter({ setFilter }) {
  return (
    <div className="flex justify-between p-4 h-20 bg-gray-200 rounded-lg shadow-md">
      <select
        className="border rounded-md p-2"
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="months">Months</option>
        <option value="days">Days</option>
        <option value="years">Years</option>
      </select>
    </div>
  );
}

export default Filter;
