const Designation = require('../models/designationSchema');

// GET all designations
exports.getAll = async (req, res) => {
    try {
        const designations = await Designation.find();
        res.status(200).json(designations);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// GET designation by ID
exports.getById = async (req, res) => {
    try {
        const designation = await Designation.findById(req.params.id);
        if (!designation) return res.status(404).json({ error: 'Designation not found' });
        res.status(200).json(designation);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// POST create new designation
exports.create = async (req, res) => {
    try {
        const newDesignation = new Designation(req.body);
        const savedDesignation = await newDesignation.save();
        res.status(201).json(savedDesignation);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

// PUT update designation by ID
exports.update = async (req, res) => {
    try {
        const updated = await Designation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: 'Designation not found' });
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: 'Invalid update data' });
    }
};

// DELETE (soft delete) designation
exports.softDelete = async (req, res) => {
    try {
        const deleted = await Designation.findByIdAndUpdate(req.params.id, { status: 'inactive' }, { new: true });
        if (!deleted) return res.status(404).json({ error: 'Designation not found' });
        res.status(200).json({ message: 'Designation marked as inactive', designation: deleted });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};
