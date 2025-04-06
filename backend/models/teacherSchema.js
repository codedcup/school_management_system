const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    // Basic Information
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phone: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    // Professional Information
    designation: {
        type: String,
    },
    teachSubject: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subjects',
        }
    ],
    teachClass: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'classes',
        }
    ],
    employmentType: {
        type: String,
        enum: ["contract", "permanent"],
        default: "permanent"
    },
    dateOfJoining: {
        type: Date,
    },
    dateOfLeaving: {
        type: Date,
    },
    contractStartDate: {
        type: Date,
    },
    contractEndDate: {
        type: Date,
    },

    // Personal Information
    address: {
        type: String,
    },
    bloodGroup: {
        type: String,
    },

    // Emergency Contact
    emergencyContactName: {
        type: String,
    },
    emergencyContactPhone: {
        type: String,
    },

    // Identity Proof
    identityProof: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "actives"
    }
}, { timestamps: true });

module.exports = mongoose.model("teacher", teacherSchema);
