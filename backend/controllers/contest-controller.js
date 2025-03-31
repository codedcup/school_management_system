const Contest = require('../models/contestModel');

// Create a new contest
const contestCreate = async (req, res) => {
  try {
    const {
      thumbnail, title, description, dateTime, syllabus, eligibility, numQuestions, paperOption,
      marksPerQuestion, negativeMarking, negativeMarkingPercent, duration, resultDisclosure,
      showSolutions, status, adminID
    } = req.body;

    const contest = new Contest({
      thumbnail, title, description, dateTime, syllabus, eligibility, numQuestions, paperOption,
      marksPerQuestion, negativeMarking, negativeMarkingPercent, duration, resultDisclosure,
      showSolutions, status: status ? 'LIVE' : 'DRAFT', adminID
    });

    const savedContest = await contest.save();
    res.status(201).json(savedContest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get list of contests for an admin
const contestList = async (req, res) => {
  try {
    const adminID = req.params.id;
    const contests = await Contest.find({ adminID });
    res.status(200).json(contests);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get contest details
const getContestDetail = async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id);
    if (!contest) return res.status(404).json({ message: 'Contest not found' });
    res.status(200).json(contest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update contest (only if DRAFT)
const updateContest = async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id);
    if (!contest) return res.status(404).json({ message: 'Contest not found' });
    if (contest.status === 'LIVE') return res.status(403).json({ message: 'Cannot edit LIVE contest' });

    const updatedContest = await Contest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedContest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete contest
const deleteContest = async (req, res) => {
  try {
    const contest = await Contest.findByIdAndDelete(req.params.id);
    if (!contest) return res.status(404).json({ message: 'Contest not found' });
    res.status(200).json({ message: 'Contest deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  contestCreate,
  contestList,
  getContestDetail,
  updateContest,
  deleteContest,
};