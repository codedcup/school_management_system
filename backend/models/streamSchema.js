const mongoose = require("mongoose");

const streamSchema = new mongoose.Schema({
    stream: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, { timestamps: true });

module.exports = mongoose.model("streams", streamSchema, "streams");