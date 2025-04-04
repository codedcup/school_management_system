const mongoose = require("mongoose");

const SalaryComponentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, // e.g. Basic, HRA, Gratuity
    amount: {
        type: Number,
        required: true
    }
});

const salarySchema = new mongoose.Schema({
    referenceId: {
        type: String,
        required: true,
    },
    components: [SalaryComponentSchema],
    totalSalary: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, { timestamps: true });

module.exports = mongoose.model("salaries", salarySchema, "salaries");