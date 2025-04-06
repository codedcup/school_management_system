const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
    section: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, { timestamps: true });

module.exports = mongoose.model("sections", sectionSchema, "sections");