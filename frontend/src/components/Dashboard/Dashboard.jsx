import React, { useState } from "react";
import SlidableMenu from "../SlidableMenu/SlidableMenu";
import FilterBar from "../FilterBar/FilterBar";
import CustomChart from "../charts/CustomChart";
import AttendanceChart from "../AttendenceChart/AttendenceChart";
import MostPracticedTopicsChart from "../MostPracticedTopics/MostPracticedTopicsChart";
import ChapterTopics from "../ChapterTopics/ChapterTopics";
import { getStudentData } from "../../assets/studentData";
import Footer from "../Footer/Footer";

function Dashboard() {
  const [selectedStudentData, setSelectedStudentData] = useState(null);

  const handleFilterSubmit = (filters) => {
    const filteredStudents = getStudentData(filters, true);
    setSelectedStudentData(filteredStudents[0] || null);
  };

  const handleShowAll = () => {
    setSelectedStudentData(null);
  };

  const defaultData = {
    attendance: {
      "2025-02-01": { studyHours: 10, questionsSolved: 15 },
      "2025-02-05": { studyHours: 8, questionsSolved: 12 },
      "2025-02-10": { studyHours: 15, questionsSolved: 20 },
    },
    practicedTopics: {
      "2025-02-01": ["Algebra", "Physics"],
      "2025-02-05": ["Geometry"],
      "2025-02-10": ["Calculus", "Biology"],
    },
    mostPracticedTopics: [
      { topic: "Algebra", count: 1 },
      { topic: "Physics", count: 1 },
      { topic: "Geometry", count: 1 },
    ],
  };

  const dataToPass = selectedStudentData || defaultData;

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* <SlidableMenu /> */}
      <FilterBar onSubmit={handleFilterSubmit} onShowAll={handleShowAll} />
      <div className="flex-1 w-full mt-16 sm:mt-20 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="col-span-1 bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center justify-center h-64 sm:h-full">
            <AttendanceChart studentData={dataToPass} />
          </div>
          <div className="col-span-1 sm:col-span-2 bg-gray-100 p-4 rounded-lg shadow-md flex items-center justify-center h-64 sm:h-full">
            <CustomChart studentData={dataToPass} />
          </div>
          <div className="col-span-1 bg-gray-100 p-4 rounded-lg shadow-md flex items-center justify-center h-64 sm:h-full">
            <MostPracticedTopicsChart studentData={dataToPass} />
          </div>
          <div className="col-span-1 sm:col-span-2 bg-gray-100 p-4 rounded-lg shadow-md flex items-center justify-center h-64 sm:h-full">
            <ChapterTopics studentData={dataToPass} />
          </div>
        </div>

      </div>
      <Footer/>
    </div>
  );
}

export default Dashboard;