import React, { useState, useEffect } from "react";
import { studentData } from "../../assets/studentData";

const FilterBar = ({ onSubmit, onShowAll }) => {
  const [filters, setFilters] = useState({
    date: "",
    grade: "",
    batch: "",
    subject: "",
    student: "",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State to toggle filter visibility
  const [filteredStudents, setFilteredStudents] = useState(studentData);

  useEffect(() => {
    const filtered = studentData.filter((student) => {
      return (
        (!filters.date || student.attendance[filters.date]) &&
        (!filters.grade || student.grade === filters.grade) &&
        (!filters.batch || student.batch === filters.batch) &&
        (!filters.subject || student.subjects.includes(filters.subject))
      );
    });
    setFilteredStudents(filtered);
    if (filters.student && !filtered.some((s) => s.name === filters.student)) {
      setFilters((prev) => ({ ...prev, student: "" }));
    }
  }, [filters.date, filters.grade, filters.batch, filters.subject]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(filters);
    setIsFilterOpen(false); // Close filter on submit (mobile)
  };

  const handleShowAllClick = () => {
    setFilters({
      date: "",
      grade: "",
      batch: "",
      subject: "",
      student: "",
    });
    onShowAll();
    setIsFilterOpen(false); // Close filter on show all (mobile)
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const uniqueDates = [
    ...new Set(studentData.flatMap((student) => Object.keys(student.attendance))),
  ].sort();
  const uniqueGrades = [...new Set(studentData.map((student) => student.grade))].sort();
  const uniqueBatches = [...new Set(studentData.map((student) => student.batch))].sort();
  const uniqueSubjects = [
    ...new Set(studentData.flatMap((student) => student.subjects)),
  ].sort();
  const studentNames = filteredStudents.map((student) => student.name);

  return (
    <div className="fixed  left-0 w-full bg-white shadow-md p-4 z-10">
      {/* Filter Button (Visible on Mobile) */}
      <div className="sm:hidden">
        <button
          onClick={toggleFilter}
          className="bg-[#652BB3] text-white px-4 py-2 rounded w-full text-sm flex items-center justify-center"
        >
          {isFilterOpen ? "Close Filters" : "Filters"}
          <svg
            className={`ml-2 w-4 h-4 transform ${isFilterOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Filter Options (Collapsible on Mobile, Always Visible on Larger Screens) */}
      <div
        className={`${
          isFilterOpen ? "block" : "hidden"
        } sm:block mt-2 sm:mt-0`}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <select
            name="date"
            value={filters.date}
            onChange={handleChange}
            className="border p-2 rounded w-full text-sm"
          >
            <option value="">Select Date</option>
            {uniqueDates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
          <select
            name="grade"
            value={filters.grade}
            onChange={handleChange}
            className="border p-2 rounded w-full text-sm"
          >
            <option value="">Select Grade</option>
            {uniqueGrades.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
          <select
            name="batch"
            value={filters.batch}
            onChange={handleChange}
            className="border p-2 rounded w-full text-sm"
          >
            <option value="">Select Batch</option>
            {uniqueBatches.map((batch) => (
              <option key={batch} value={batch}>
                {batch}
              </option>
            ))}
          </select>
          <select
            name="subject"
            value={filters.subject}
            onChange={handleChange}
            className="border p-2 rounded w-full text-sm"
          >
            <option value="">Select Subject</option>
            {uniqueSubjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          <select
            name="student"
            value={filters.student}
            onChange={handleChange}
            className="border p-2 rounded w-full text-sm"
          >
            <option value="">Select Student</option>
            {studentNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <div className="flex gap-2 w-full sm:w-auto justify-center">
            <button
              onClick={handleShowAllClick}
              className="bg-[#652BB3] text-white px-3 py-2 rounded w-full sm:w-auto text-sm"
            >
              Show All
            </button>
            <button
              onClick={handleSubmit}
              className="bg-[#652BB3] text-white px-3 py-2 rounded w-full sm:w-auto text-sm"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;