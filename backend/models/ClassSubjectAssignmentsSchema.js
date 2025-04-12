const mongoose = require("mongoose");

const ClassSubjectAssignments = new mongoose.Schema({
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'classes',
        required: true,
    },
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sections",
        required: true
    },
    streamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "streams",
        required: true
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subjects',
        required: true,
    },
    subjectCode: {
        type: String
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, { timestamps: true });

module.exports = mongoose.model("classSubjectAssignments", ClassSubjectAssignments, "classSubjectAssignments");