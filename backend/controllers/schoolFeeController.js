const SchoolFee = require('../models/schoolFeeSchema');

// GET all school fees
exports.getAll = async (req, res) => {
    try {
        const fees = await SchoolFee.find().populate('studentId');
        res.status(200).json(fees);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// GET school fee by ID
exports.getById = async (req, res) => {
    try {
        const fee = await SchoolFee.findById(req.params.id).populate('studentId');
        if (!fee) return res.status(404).json({ error: 'School fee record not found' });
        res.status(200).json(fee);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// POST create new school fee record
exports.create = async (req, res) => {
    try {
        const newFee = new SchoolFee(req.body);
        const saved = await newFee.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

// PUT update school fee record
exports.update = async (req, res) => {
    try {
        const updated = await SchoolFee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: 'School fee record not found' });
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: 'Invalid update data' });
    }
};

// DELETE (soft delete school fee - optional, may not be typical)
exports.softDelete = async (req, res) => {
    try {
        const deleted = await SchoolFee.findByIdAndUpdate(req.params.id, { paymentStatus: 'unpaid' }, { new: true });
        if (!deleted) return res.status(404).json({ error: 'School fee record not found' });
        res.status(200).json({ message: 'Marked as unpaid', record: deleted });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};
