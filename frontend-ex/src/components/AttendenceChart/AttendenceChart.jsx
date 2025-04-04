import React, { useState } from "react";

function AttendanceChart({ studentData }) {
  // Set initial state to current date
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Format month and year
  const formattedMonth = currentMonth.toLocaleString("default", { month: "long", year: "numeric" });

  // Get days in the current month
  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const days = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: days }, (_, i) => new Date(year, month, i + 1));
  };

  // Determine day color based on attendance data
  const getDayColor = (date) => {
    if (!studentData || !studentData.attendance) return "bg-gray-100 text-black";
    const formattedDate = date.toISOString().split("T")[0];
    const studyHours = studentData.attendance[formattedDate]?.studyHours || 0;

    if (studyHours >= 18) return "bg-green-500 text-white";
    if (studyHours <= 12 && studyHours > 5) return "bg-yellow-400 text-black";
    if (studyHours <= 5 && studyHours > 0) return "bg-red-500 text-white";
    return "bg-gray-100 text-black";
  };

  // Handle month change
  const changeMonth = (offset) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + offset);
    setCurrentMonth(newMonth);
  };

  return (
    <div className="w-full mx-auto bg-white p-3 sm:p-4 shadow-md rounded-lg">
      <h2 className="text-base sm:text-lg font-semibold text-center mb-2">Attendance Calendar</h2>

      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-2">
        <button
          className="px-2 py-1 bg-gray-200 rounded text-sm sm:text-base"
          onClick={() => changeMonth(-1)}
        >
          ◁
        </button>
        <h3 className="text-sm sm:text-md font-semibold">{formattedMonth}</h3>
        <button
          className="px-2 py-1 bg-gray-200 rounded text-sm sm:text-base"
          onClick={() => changeMonth(1)}
        >
          ▷
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-semibold text-xs sm:text-sm truncate">
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {getDaysInMonth().map((date) => (
          <div
            key={date.toISOString().split("T")[0]}
            className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full cursor-pointer text-xs sm:text-sm ${getDayColor(
              date
            )} ${selectedDate?.getTime() === date.getTime() ? "ring-2 ring-blue-500" : ""}`}
            onClick={() => setSelectedDate(date)}
          >
            {date.getDate()}
          </div>
        ))}
      </div>

      {/* No Data Message */}
      {!studentData?.attendance && (
        <p className="text-center mt-4 text-gray-500 text-xs sm:text-sm">
          No attendance data available
        </p>
      )}
    </div>
  );
}

export default AttendanceChart;