const ClassTeacher = require('../models/classTeacherSchema'); 

// GET all class-teacher assignments
exports.getAll = async (req, res) => {
    try {
        const records = await ClassTeacher.find()
            .populate('classId')
            .populate('sectionId')
            .populate('teacherId');
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// GET single class-teacher assignment by ID
exports.getById = async (req, res) => {
    try {
        const record = await ClassTeacher.findById(req.params.id)
            .populate('classId')
            .populate('sectionId')
            .populate('teacherId');
        if (!record) return res.status(404).json({ error: 'Class teacher assignment not found' });
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// POST create new class-teacher assignment
exports.create = async (req, res) => {
    try {
        const newAssignment = new ClassTeacher(req.body);
        const saved = await newAssignment.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

// PUT update class-teacher assignment
exports.update = async (req, res) => {
    try {
        const updated = await ClassTeacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: 'Class teacher assignment not found' });
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: 'Invalid update data' });
    }
};

// DELETE (soft delete)
exports.softDelete = async (req, res) => {
    try {
        const deleted = await ClassTeacher.findByIdAndUpdate(req.params.id, { status: 'inactive' }, { new: true });
        if (!deleted) return res.status(404).json({ error: 'Class teacher assignment not found' });
        res.status(200).json({ message: 'Assignment marked as inactive', assignment: deleted });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};
