const Admin = require('../models/adminSchema');
const Teacher = require('../models/teacherSchema');
const Student = require('../models/studentSchema');
const { comparePassword } = require('../utils/cryptoUtil');
const { generateToken } = require('../utils/jwtUtils');

exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(404).json({ error: 'Admin not found' });

        const isMatch = await comparePassword(password, admin.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = generateToken({ id: admin._id, role: admin.role, type: 'admin' });
        res.json({ token, user: admin });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.loginTeacher = async (req, res) => {
    const { email, password } = req.body;
    try {
        const teacher = await Teacher.findOne({ email });
        if (!teacher) return res.status(404).json({ error: 'Teacher not found' });

        const isMatch = await comparePassword(password, teacher.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = generateToken({ id: teacher._id, role: 'teacher', type: 'teacher' });
        res.json({ token, user: teacher });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.loginStudent = async (req, res) => {
    const { studentId, password } = req.body;
    try {
        const student = await Student.findOne({ studentId });
        if (!student) return res.status(404).json({ error: 'Student not found' });

        const isMatch = await comparePassword(password, student.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = generateToken({ id: student._id, role: 'student', type: 'student' });
        res.json({ token, user: student });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
