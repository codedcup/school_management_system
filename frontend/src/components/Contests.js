import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllContests, addContest } from '../redux/ContestRelated/contestHandle';
import { FaCalendarAlt, FaBook, FaClock, FaUpload, FaQuestionCircle } from 'react-icons/fa';
import Popup from '../components/Popup';

const Contests = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { contests, loading, error, response } = useSelector((state) => state.contest);
  const { currentUser } = useSelector((state) => state.user);

  const adminID = currentUser._id;
  console.log(adminID)

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    thumbnail: null,
    title: '',
    description: '',
    dateTime: '',
    syllabus: [],
    eligibility: '',
    numQuestions: '',
    paperOption: '',
    marksPerQuestion: '',
    negativeMarking: false,
    negativeMarkingPercent: '',
    duration: '',
    resultDisclosure: 'yes',
    showSolutions: 'yes',
    status: false,
    adminID,
  });
  const [errors, setErrors] = useState({});
  const [showSyllabusModal, setShowSyllabusModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  const syllabusOptions = [
    { subject: 'Math', chapters: ['Algebra', 'Geometry', 'Calculus'] },
    { subject: 'Science', chapters: ['Physics', 'Chemistry', 'Biology'] },
  ];

  useEffect(() => {
    dispatch(getAllContests(adminID));
  }, [dispatch, adminID]);

  const handleInputChange = (e) => {
    try {
      const { name, value, type, checked, files } = e.target;
      if (type === 'file') {
        const file = files[0];
        const validFormats = ['image/jpeg', 'image/png'];
        if (!validFormats.includes(file?.type)) {
          setErrors({ ...errors, thumbnail: 'Only .jpg or .png formats are allowed.' });
          return;
        }
        if (file?.size > 2 * 1024 * 1024) {
          setErrors({ ...errors, thumbnail: 'File size should not exceed 2MB.' });
          return;
        }
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          if (img.width < 300 || img.height < 200) {
            setErrors({ ...errors, thumbnail: 'Image must be at least 300x200 pixels.' });
          } else {
            setErrors({ ...errors, thumbnail: '' });
            setFormData({ ...formData, thumbnail: file });
          }
        };
      } else if (type === 'checkbox') {
        setFormData({ ...formData, [name]: checked });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    } catch (error) {
      console.error('Error in handleInputChange:', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.thumbnail) newErrors.thumbnail = 'Thumbnail is required.';
    if (!formData.title || formData.title.length > 100) newErrors.title = 'Title is required and must be less than 100 characters.';
    if (!formData.description || formData.description.length > 5000) newErrors.description = 'Description is required and must be less than 5000 characters.';
    if (!formData.dateTime) {
      newErrors.dateTime = 'Date and Time are required.';
    } else {
      const selectedDate = new Date(formData.dateTime);
      const minDate = new Date();
      minDate.setDate(minDate.getDate() + 3);
      if (selectedDate < minDate) newErrors.dateTime = 'Date and Time must be at least 3 days in the future.';
    }
    if (!formData.eligibility) newErrors.eligibility = 'Eligibility criteria are required.';
    if (!formData.numQuestions || formData.numQuestions <= 0) newErrors.numQuestions = 'Number of questions must be a positive integer.';
    if (!formData.marksPerQuestion || formData.marksPerQuestion <= 0) newErrors.marksPerQuestion = 'Marks per question must be a positive integer.';
    if (formData.negativeMarking && (!formData.negativeMarkingPercent || formData.negativeMarkingPercent < 0 || formData.negativeMarkingPercent > 100)) {
      newErrors.negativeMarkingPercent = 'Negative marking percentage must be between 0 and 100.';
    }
    if (!formData.duration || formData.duration <= 0) newErrors.duration = 'Duration must be a positive integer.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (formData.status) {
      setShowConfirmDialog(true);
    } else {
      await submitContest();
    }
  };

  const submitContest = async () => {
    try {
      const result = await dispatch(addContest(formData)).unwrap();
      setShowForm(false);
      setFormData({
        thumbnail: null,
        title: '',
        description: '',
        dateTime: '',
        syllabus: [],
        eligibility: '',
        numQuestions: '',
        paperOption: '',
        marksPerQuestion: '',
        negativeMarking: false,
        negativeMarkingPercent: '',
        duration: '',
        resultDisclosure: 'yes',
        showSolutions: 'yes',
        status: false,
        adminID,
      });
      setShowConfirmDialog(false);
      navigate(`/Admin/contests/contest/${result._id}`);
    } catch (err) {
      setMessage(err || 'Failed to create contest');
      setShowPopup(true);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Contests</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center"
        >
          {showForm ? 'Cancel' : 'Create new Contest'}
          <span className="ml-2">{showForm ? '✕' : '+'}</span>
        </button>
      </div>

      {showForm ? (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Create New Contest</h3>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contest Details Section */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Contest Details</h4>
              <div className="space-y-4">
                {/* Thumbnail */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail (300x200px, max 2MB, .jpg/.png)</label>
                  <div className="relative">
                    <input
                      type="file"
                      name="thumbnail"
                      accept=".jpg,.png"
                      onChange={handleInputChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                    <FaUpload className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  {errors.thumbnail && <p className="mt-1 text-sm text-red-700 bg-red-100 p-2 rounded">{errors.thumbnail}</p>}
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title (max 100 characters)</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    maxLength="100"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter contest title"
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-700 bg-red-100 p-2 rounded">{errors.title}</p>}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description (max 5000 characters)</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    maxLength="5000"
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter contest description"
                  />
                  {errors.description && <p className="mt-1 text-sm text-red-700 bg-red-100 p-2 rounded">{errors.description}</p>}
                </div>

                {/* Date and Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date and Time (must be 3 days in future)</label>
                  <div className="relative">
                    <input
                      type="datetime-local"
                      name="dateTime"
                      value={formData.dateTime}
                      onChange={handleInputChange}
                      min={new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().slice(0, 16)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  {errors.dateTime && <p className="mt-1 text-sm text-red-700 bg-red-100 p-2 rounded">{errors.dateTime}</p>}
                </div>
              </div>
            </div>

            {/* Exam Settings Section */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Exam Settings</h4>
              <div className="space-y-4">
                {/* Syllabus */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Syllabus</label>
                  <button
                    type="button"
                    onClick={() => setShowSyllabusModal(true)}
                    className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
                  >
                    <FaBook className="mr-2" /> Select Syllabus
                  </button>
                  {formData.syllabus.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">Selected: {formData.syllabus.join(', ')}</p>
                    </div>
                  )}
                </div>

                {/* Syllabus Modal */}
                {showSyllabusModal && (
                  <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center transition-opacity duration-300">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full transform transition-all duration-300 scale-100">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Select Syllabus</h3>
                      <div className="space-y-4">
                        {syllabusOptions.map((subject, idx) => (
                          <div key={idx}>
                            <h4 className="font-medium text-gray-700">{subject.subject}</h4>
                            <div className="mt-2 space-y-2">
                              {subject.chapters.map((chapter, idx2) => (
                                <div key={idx2} className="flex items-center">
                                  <input
                                    type="checkbox"
                                    checked={formData.syllabus.includes(chapter)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setFormData({ ...formData, syllabus: [...formData.syllabus, chapter] });
                                      } else {
                                        setFormData({
                                          ...formData,
                                          syllabus: formData.syllabus.filter((ch) => ch !== chapter),
                                        });
                                      }
                                    }}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                  />
                                  <label className="ml-2 text-sm text-gray-600">{chapter}</label>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => setShowSyllabusModal(false)}
                        className="mt-6 w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}

                {/* Eligibility Criteria */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility Criteria</label>
                  <input
                    type="text"
                    name="eligibility"
                    value={formData.eligibility}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter eligibility criteria"
                  />
                  {errors.eligibility && <p className="mt-1 text-sm text-red-700 bg-red-100 p-2 rounded">{errors.eligibility}</p>}
                </div>

                {/* Number of Questions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">No. of Questions</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="numQuestions"
                      value={formData.numQuestions}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter number of questions"
                    />
                    <FaQuestionCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  {errors.numQuestions && <p className="mt-1 text-sm text-red-700 bg-red-100 p-2 rounded">{errors.numQuestions}</p>}
                </div>

                {/* Paper Upload/Generate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload Paper or Generate</label>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
                    >
                      Upload Paper
                    </button>
                    <button
                      type="button"
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
                    >
                      Generate Using Our Services
                    </button>
                  </div>
                </div>

                {/* Marks per Question */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Marks for Question</label>
                  <input
                    type="number"
                    name="marksPerQuestion"
                    value={formData.marksPerQuestion}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter marks per question"
                  />
                  {errors.marksPerQuestion && <p className="mt-1 text-sm text-red-700 bg-red-100 p-2 rounded">{errors.marksPerQuestion}</p>}
                </div>

                {/* Negative Marking */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Negative Marking</label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="negativeMarking"
                      checked={formData.negativeMarking}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-600">Enable Negative Marking</label>
                  </div>
                  {formData.negativeMarking && (
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Negative Marking Percentage (0-100)</label>
                      <input
                        type="number"
                        name="negativeMarkingPercent"
                        value={formData.negativeMarkingPercent}
                        onChange={handleInputChange}
                        min="0"
                        max="100"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter percentage"
                      />
                      {errors.negativeMarkingPercent && <p className="mt-1 text-sm text-red-700 bg-red-100 p-2 rounded">{errors.negativeMarkingPercent}</p>}
                    </div>
                  )}
                </div>

                {/* Duration of Exam */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration of Exam (in minutes)</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter duration in minutes"
                    />
                    <FaClock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  {errors.duration && <p className="mt-1 text-sm text-red-700 bg-red-100 p-2 rounded">{errors.duration}</p>}
                </div>
              </div>
            </div>

            {/* Result and Disclosure Settings Section */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Result and Disclosure Settings</h4>
              <div className="space-y-4">
                {/* Result Disclosure */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Result, Scholarship, Rank to be Disclosed</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="resultDisclosure"
                        value="yes"
                        checked={formData.resultDisclosure === 'yes'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-600">Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="resultDisclosure"
                        value="no"
                        checked={formData.resultDisclosure === 'no'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-600">No</span>
                    </label>
                  </div>
                </div>

                {/* Show Solutions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Show Solutions to Students</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="showSolutions"
                        value="yes"
                        checked={formData.showSolutions === 'yes'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-600">Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="showSolutions"
                        value="no"
                        checked={formData.showSolutions === 'no'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-600">No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Section */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Status</h4>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="status"
                  checked={formData.status}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-600">Set as LIVE (else DRAFT)</label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-300"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Contest'}
              </button>
            </div>

            {/* Confirmation Dialog */}
            {showConfirmDialog && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center transition-opacity duration-300">
                <div className="bg-white rounded-lg p-6 max-w-sm w-full transform transition-all duration-300 scale-100">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirm Submission</h3>
                  <p className="text-gray-600 mb-6">
                    Once submitted as LIVE, you cannot edit this contest later. Are you sure?
                  </p>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={submitContest}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setShowConfirmDialog(false)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6">
          {loading ? (
            <p>Loading contests...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. of Registrations</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contests.map((contest) => (
                  <tr key={contest._id}>
                    <td className="py-4 px-6 text-sm text-gray-900">{contest.title}</td>
                    <td className="py-4 px-6 text-sm text-gray-500">{new Date(contest.dateTime).toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          contest.status === 'LIVE' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {contest.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">{contest.registrations}</td>
                    <td className="py-4 px-6 text-sm">
                      {contest.status === 'DRAFT' && (
                        <button className="bg-indigo-600 text-white px-3 py-1 rounded-md mr-2 hover:bg-indigo-700 transition duration-300">
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => navigate(`/Admin/contests/contest/${contest._id}`)}
                        className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 transition duration-300"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </div>
  );
};

export default Contests;