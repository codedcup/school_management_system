const StudentList = ({ students }) => {
    return (
      <div className="bg-white p-4 shadow-md rounded-lg">
        <h2 className="text-xl font-bold text-gray-700">Filtered Students</h2>
        <select className="mt-3 w-full p-2 border border-gray-300 rounded">
          {students.length > 0 ? (
            students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name} ({student.id})
              </option>
            ))
          ) : (
            <option>No students found</option>
          )}
        </select>
      </div>
    );
  };
  
  export default StudentList;
  