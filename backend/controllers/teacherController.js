const Teacher = require('../models/teacherSchema');
const { hashPassword } = require('../utils/cryptoUtil');
// GET all teachers
exports.getAll = async (req, res) => {
    try {
        const teachers = await Teacher.find()
            .populate('teachSubject')
            .populate('teachClass');
        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// GET teacher by ID
exports.getById = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id)
            .populate('teachSubject')
            .populate('teachClass');
        if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// POST create new teacher
exports.create = async (req, res) => {
    try {
        const { password, ...rest } = req.body;

        // Hash the password before saving
        const hashedPassword = await hashPassword(password);

        const newTeacher = new Teacher({
            ...rest,
            password: hashedPassword
        });
        
        const saved = await newTeacher.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

// PUT update teacher
exports.update = async (req, res) => {
    try {
        const updated = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: 'Teacher not found' });
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: 'Invalid update data' });
    }
};

// DELETE (soft delete - optional; if not using status, you can perform real delete)
exports.softDelete = async (req, res) => {
    try {
        const deleted = await Teacher.findByIdAndUpdate(req.params.id, { status: 'inactive' }, { new: true });
        if (!deleted) return res.status(404).json({ error: 'Teacher not found' });
        res.status(200).json({ message: 'Teacher record deleted', teacher: deleted });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};