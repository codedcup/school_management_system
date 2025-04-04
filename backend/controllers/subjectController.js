const Subject = require('../models/subjectsSchema');

// GET all subjects
exports.getAll = async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// GET subject by ID
exports.getById = async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id);
        if (!subject) return res.status(404).json({ error: 'Subject not found' });
        res.status(200).json(subject);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// POST create new subject
exports.create = async (req, res) => {
    try {
        const newSubject = new Subject(req.body);
        const savedSubject = await newSubject.save();
        res.status(201).json(savedSubject);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

// PUT update subject by ID
exports.update = async (req, res) => {
    try {
        const updated = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: 'Subject not found' });
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: 'Invalid update data' });
    }
};

// DELETE (soft delete) subject
exports.softDelete = async (req, res) => {
    try {
        const deleted = await Subject.findByIdAndUpdate(req.params.id, { status: 'inactive' }, { new: true });
        if (!deleted) return res.status(404).json({ error: 'Subject not found' });
        res.status(200).json({ message: 'Subject marked as inactive', subject: deleted });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};
