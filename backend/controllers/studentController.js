const Student = require('../models/studentSchema');
const { hashPassword } = require('../utils/cryptoUtil');
// GET all students
exports.getAll = async (req, res) => {
    try {
        const students = await Student.find().populate('class');
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// GET student by ID
exports.getById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).populate('class');
        if (!student) return res.status(404).json({ error: 'Student not found' });
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// POST create new student
exports.create = async (req, res) => {
    try {
        const { password, ...rest } = req.body;
        //console.log(req.body)

        // Hash the password before saving
        const hashedPassword = await hashPassword(password);

        const newTeacher = new Student({
            ...rest,
            password: hashedPassword
        });


        const saved = await newTeacher.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

// PUT update student
exports.update = async (req, res) => {
    try {
        const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: 'Student not found' });
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: 'Invalid update data' });
    }
};

// DELETE (soft delete is not applicable here by default, but if needed, you can add a `status` field)
exports.softDelete = async (req, res) => {
    try {
        const deleted = await Student.findByIdAndUpdate(req.params.id, { status: 'inactive' }, { new: true });
        if (!deleted) return res.status(404).json({ error: 'Student not found' });
        res.status(200).json({ message: 'Student record deleted', student: deleted });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};
