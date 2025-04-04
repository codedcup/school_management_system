const classesSchema = new mongoose.Schema({
    class: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, { timestamps: true });

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

const subjectSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, { timestamps: true });

const ClassSubjectAssignments = new mongoose.Schema({
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'classes',
        required: true,
    },
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sections",
        required: true
    },
    streamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "streans",
        required: true
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subjects',
        required: true,
    },
    subjectCode: {
        type: String
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, { timestamps: true });

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

const classTeacherSchema = new mongoose.Schema({
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "class",
        required: true,
    },
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sections",
        required: true,
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teacher",
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, { timestamps: true });

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
    }

});

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
    }

}, { timestamps: true });