const mongoose = require("mongoose");

const classesSchema = new mongoose.Schema({
    class: {
        type: String,
        unique: true,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, { timestamps: true });

module.exports = mongoose.model("classes", classesSchema, "classes");