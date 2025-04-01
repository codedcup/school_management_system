const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    subjectName: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, { timestamps: true });

module.exports = mongoose.model("subjects", subjectSchema, "subjects");