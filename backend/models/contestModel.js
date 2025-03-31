const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
  thumbnail: { type: String }, // Store file path or URL
  title: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 5000 },
  dateTime: { type: Date, required: true },
  syllabus: [{ type: String }],
  eligibility: { type: String, required: true },
  numQuestions: { type: Number, required: true, min: 1 },
  paperOption: { type: String },
  marksPerQuestion: { type: Number, required: true, min: 1 },
  negativeMarking: { type: Boolean, default: false },
  negativeMarkingPercent: { type: Number, min: 0, max: 100 },
  duration: { type: Number, required: true, min: 1 },
  resultDisclosure: { type: String, enum: ['yes', 'no'], default: 'yes' },
  showSolutions: { type: String, enum: ['yes', 'no'], default: 'yes' },
  status: { type: String, enum: ['LIVE', 'DRAFT'], default: 'DRAFT' },
  registrations: { type: Number, default: 0 },
  adminID: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Contest', contestSchema);