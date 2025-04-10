const Class = require('../models/classesSchema');

// GET all classes
exports.getAll = async (req, res) => {
    try {
        const classes = await Class.find({status: "active"});
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// GET class by ID
exports.getById = async (req, res) => {
    try {
        const cls = await Class.findById(req.params.id);
        if (!cls) return res.status(404).json({ error: 'Class not found' });
        res.status(200).json(cls);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// POST create new class
exports.create = async (req, res) => {
    try {
        const newClass = new Class(req.body);
        const savedClass = await newClass.save();
        res.status(201).json(savedClass);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

// PUT update class by ID
exports.update = async (req, res) => {
    try {
        const updated = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: 'Class not found' });
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: 'Invalid update data' });
    }
};

// DELETE (soft delete) class
exports.softDelete = async (req, res) => {
    try {
        const deleted = await Class.findByIdAndUpdate(req.params.id, { status: 'inactive' }, { new: true });
        if (!deleted) return res.status(404).json({ error: 'Class not found' });
        res.status(200).json({ message: 'Class marked as inactive', class: deleted });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};
