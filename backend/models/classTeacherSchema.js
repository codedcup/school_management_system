const mongoose = require("mongoose");

const classTeacherSchema = new mongoose.Schema({
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "classes",
        required: true,
    },
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sections",
        required: true,
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teacher",
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, { timestamps: true });

module.exports = mongoose.model("classTeacher", classTeacherSchema, "classTeacher");