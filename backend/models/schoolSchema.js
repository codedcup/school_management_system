const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
    schoolName: {
        type: String,
        required: true,
    },
    schoolCode: {
        type: String,
        required: true
    },
    adminEmail: {
        type: String,
        required: true
    },
    adminPassword: {
        type: String,
        required: true
    },
    acedemicYear: {
        startMonth: { 
            type: Number,
            required: true,
            default: 4
        },
        endMonth: {
            type: Number,
            required: true,
            default: 3
        }
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, { timestamps: true });

module.exports = mongoose.model("school", schoolSchema, "school");