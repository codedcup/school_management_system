const mongoose = require("mongoose");

const designationSchema = new mongoose.Schema({
    designation: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, { timestamps: true });

module.exports = mongoose.model("designations", designationSchema, "designations");