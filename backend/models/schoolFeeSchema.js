const mongoose = require("mongoose");

const FeeComponentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, // e.g. Tuition, Admission, Transport
    amount: {
        type: Number,
        required: true
    },
    frequency: {
        type: String,
        enum: ['one-time', 'monthly', 'term', 'annual'], 
        default: 'annual'
    }
});

const SchoolFeeSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students', 
        required: true
    },
    academicYear: {
        type: String,
        required: true
    },
    components: [FeeComponentSchema],
    totalFee: {
        type: Number,
        required: true
    },
    paidAmount: {
        type: Number,
        default: 0
    },
    paymentStatus: {
        type: String,
        enum: ['unpaid', 'partial', 'paid'], 
        default: 'unpaid'
    }
}, { timestamps: true });

module.exports = mongoose.model("schoolfees", SchoolFeeSchema, "schoolfees");
