const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authMiddleware = require('./middlewares/authMiddleware.js');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const adminRoutes = require('./routes/adminRoutes.js');
const assignmentRoutes = require('./routes/assignmentRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const classRoutes = require('./routes/classRoutes.js');
const classTeacherRoutes = require('./routes/classTeacherRoutes.js');
const designationRoutes = require('./routes/designationRoutes.js');
const salaryRoutes = require('./routes/salaryRoutes.js');
const schoolFeeRoutes = require('./routes/schoolFeeRoutes.js');
const sectionRoutes = require('./routes/sectionRoutes.js');
const streamRoutes = require('./routes/streamRoutes.js');
const studentRoutes = require('./routes/studentRoutes.js');
const subjectRoutes = require('./routes/subjectRoutes.js');
const teacherRoutes = require('./routes/teacherRoutes.js');

app.use('/api/auth', authMiddleware, authRoutes);
app.use('/api/admin', authMiddleware, adminRoutes);
app.use('/api/assignment', authMiddleware, assignmentRoutes);
app.use('/api/class', authMiddleware, classRoutes);
app.use('/api/classTeacher', authMiddleware, classTeacherRoutes);
app.use('/api/designation', authMiddleware, designationRoutes);
app.use('/api/salary', authMiddleware, salaryRoutes);
app.use('/api/schoolFee', authMiddleware, schoolFeeRoutes);
app.use('/api/section', authMiddleware, sectionRoutes);
app.use('/api/stream', authMiddleware, streamRoutes);
app.use('/api/student', authMiddleware, studentRoutes);
app.use('/api/subject', authMiddleware, subjectRoutes);
app.use('/api/teacher', authMiddleware, teacherRoutes);

module.exports = app;