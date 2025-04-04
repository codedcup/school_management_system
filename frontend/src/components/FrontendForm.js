// File: FrontendForum.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlueButton, GreenButton } from '../components/buttonStyles';
import Popup from '../components/Popup';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

const FrontendForum = ({
  title,
  dataList,
  loading,
  error,
  buttonData,
  viewPath,
  editPath,
  nameKey = 'name'
}) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const deleteHandler = (deleteID) => {
    setMessage("Sorry, the delete function has been disabled for now.");
    setShowPopup(true);
  };

  const sortedData = () => {
    if (!dataList) return [];
    const filtered = dataList.filter((item) =>
      item[nameKey]?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return [...filtered].sort((a, b) => {
      if (!sortConfig.key) return 0;
      let valueA = a[sortConfig.key]?.toString().toLowerCase() || '';
      let valueB = b[sortConfig.key]?.toString().toLowerCase() || '';
      return sortConfig.direction === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(sortedData().map(item => item._id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-100">
      <div className="flex justify-between items-center p-4 bg-blue-600 text-white border-b shadow-md rounded-lg">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex gap-4">
          {buttonData.map((button, index) => (
            <GreenButton key={index} onClick={() => navigate(button.link)}>
              {button.name}
            </GreenButton>
          ))}
        </div>
      </div>

      <div className="flex-1 p-6 ">
        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded w-full max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : sortedData().length === 0 ? (
          <p className="text-center">No {title.toLowerCase()} found. Add a new one to get started.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg shadow-lg text-center">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === sortedData().length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="py-3 px-6 cursor-pointer" onClick={() => handleSort(nameKey)}>
                    Name {sortConfig.key === nameKey && (sortConfig.direction === 'asc' ? <ArrowUpward /> : <ArrowDownward />)}
                  </th>
                  <th className="py-3 px-6 cursor-pointer" onClick={() => handleSort('status')}>
                    Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? <ArrowUpward /> : <ArrowDownward />)}
                  </th>
                  <th className="py-3 px-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedData().map((item) => (
                  <tr key={item._id} className="border-b hover:bg-gray-100 transition">
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(item._id)}
                        onChange={() => handleCheckboxChange(item._id)}
                      />
                    </td>
                    <td className="py-3 px-6">{item[nameKey]}</td>
                    <td className="py-3 px-6">{item.status || 'Active'}</td>
                    <td className="py-3 px-6 flex gap-3 justify-center">
                      <button 
                        onClick={() => deleteHandler(item._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 shadow-md hover:bg-red-700 transition"
                      >
                        <DeleteIcon fontSize="small" /> Delete
                      </button>
                      <BlueButton onClick={() => navigate(`${viewPath}/${item._id}`)}>View</BlueButton>
                      <button 
                        onClick={() => navigate(`${editPath}/${item._id}`)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg flex items-center gap-1 shadow-md hover:bg-yellow-600 transition"
                      >
                        <EditIcon fontSize="small" /> Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </div>
  );
};

export default FrontendForum;
