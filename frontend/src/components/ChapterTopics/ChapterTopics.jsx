import React from "react";

const ChapterTopics = ({ studentData }) => {
  const defaultData = {
    practicedTopics: {
      "2025-02-01": ["Algebra", "Physics"],
      "2025-02-05": ["Geometry"],
      "2025-02-10": ["Calculus", "Biology"],
    },
  };

  const data = studentData || defaultData;

  const getMostPracticedChapter = () => {
    if (!data.practicedTopics) return "No Data Available";
    const topicCount = {};
    Object.values(data.practicedTopics).flat().forEach((topic) => {
      topicCount[topic] = (topicCount[topic] || 0) + 1;
    });
    const mostPracticed = Object.entries(topicCount).sort((a, b) => b[1] - a[1])[0];
    return mostPracticed ? mostPracticed[0] : "No Data Available";
  };

  const getWeekConcepts = () => {
    if (!data.practicedTopics) return { chapter: "No Data", topic: "No Data" };
    const dates = Object.keys(data.practicedTopics).sort();
    const latestDate = dates[dates.length - 1];
    const latestTopics = data.practicedTopics[latestDate] || [];
    return {
      chapter: latestTopics[0] || "No Recent Chapter",
      topic: latestTopics[1] || latestTopics[0] || "No Recent Topic",
    };
  };

  const mostPracticedChapter = getMostPracticedChapter();
  const { chapter: weekChapter, topic: weekTopic } = getWeekConcepts();

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-md p-2 sm:p-4">
      {/* Title Section */}
      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-bold text-pink-700 text-center w-full sm:w-1/2">
          MOST PRACTICED CHAPTER
        </h2>
        <h2 className="text-lg sm:text-xl font-bold text-pink-700 text-center w-full sm:w-1/2">
          WEEK CONCEPTS
        </h2>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mt-4">
        {/* Most Practiced Chapter */}
        <div className="flex flex-col items-center bg-gray-200 p-2 sm:p-4 rounded-lg shadow-md">
          <div className="bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-lg mb-2 text-xs sm:text-sm font-bold">
            CHAPTER
          </div>
          <p className="text-pink-700 font-semibold text-center text-xs sm:text-sm">{mostPracticedChapter}</p>
        </div>

        {/* Most Practiced Topic */}
        <div className="flex flex-col items-center bg-gray-200 p-2 sm:p-4 rounded-lg shadow-md">
          <div className="bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-lg mb-2 text-xs sm:text-sm font-bold">
            TOPIC
          </div>
          <p className="text-gray-700 text-center text-xs sm:text-sm">{mostPracticedChapter}</p>
        </div>

        {/* Week Concept Chapter */}
        <div className="flex flex-col items-center bg-gray-200 p-2 sm:p-4 rounded-lg shadow-md">
          <div className="bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-lg mb-2 text-xs sm:text-sm font-bold">
            CHAPTER
          </div>
          <p className="text-pink-700 font-semibold text-center text-xs sm:text-sm">{weekChapter}</p>
        </div>

        {/* Week Concept Topic */}
        <div className="flex flex-col items-center bg-gray-200 p-2 sm:p-4 rounded-lg shadow-md">
          <div className="bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-lg mb-2 text-xs sm:text-sm font-bold">
            TOPIC
          </div>
          <p className="text-gray-700 text-center text-xs sm:text-sm">{weekTopic}</p>
        </div>
      </div>
    </div>
  );
};

export default ChapterTopics;