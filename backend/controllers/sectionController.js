const Section = require('../models/sectionSchema');

// GET all sections
exports.getAll = async (req, res) => {
    try {
        const sections = await Section.find();
        res.status(200).json(sections);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// GET section by ID
exports.getById = async (req, res) => {
    try {
        const section = await Section.findById(req.params.id);
        if (!section) return res.status(404).json({ error: 'Section not found' });
        res.status(200).json(section);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// POST create new section
exports.create = async (req, res) => {
    try {
        const newSection = new Section(req.body);
        const savedSection = await newSection.save();
        res.status(201).json(savedSection);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

// PUT update section by ID
exports.update = async (req, res) => {
    try {
        const updated = await Section.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: 'Section not found' });
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: 'Invalid update data' });
    }
};

// DELETE (soft delete) section
exports.softDelete = async (req, res) => {
    try {
        const deleted = await Section.findByIdAndUpdate(req.params.id, { status: 'inactive' }, { new: true });
        if (!deleted) return res.status(404).json({ error: 'Section not found' });
        res.status(200).json({ message: 'Section marked as inactive', section: deleted });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};
