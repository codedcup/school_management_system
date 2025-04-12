const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    // Basic Information
    name: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true
    },
    rollNum: {
        type: Number,
        required: true
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "classSubjectAssignments",
        required: true
    },
    password: {
        type: String,
        required: true
    },

    // Contact Information
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    primaryContactMode: {
        type: String,
        enum: ['phone', 'email'],
        default: 'phone'
    },
    address: {
        type: String
    },

    // Family Information
    fatherName: {
        type: String
    },
    motherName: {
        type: String
    },
    fatherOccupation: {
        type: String
    },
    motherOccupation: {
        type: String
    },

    // Personal & Health Information
    bloodGroup: {
        type: String
    },
    medicalCondition: {
        type: String
    },
    identityProof: {
        type: String
    },
    photo: {
        type: String
    },

    // Academic Lifecycle
    dateOfAdmission: {
        type: Date
    },
    dateOfLeaving: {
        type: Date
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
});

module.exports = mongoose.model("students", studentSchema, "students");
