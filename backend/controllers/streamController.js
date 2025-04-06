const Stream = require('../models/streamSchema');

// GET all streams
exports.getAll = async (req, res) => {
    try {
        const streams = await Stream.find();
        res.status(200).json(streams);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// GET stream by ID
exports.getById = async (req, res) => {
    try {
        const stream = await Stream.findById(req.params.id);
        if (!stream) return res.status(404).json({ error: 'Stream not found' });
        res.status(200).json(stream);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// POST create new stream
exports.create = async (req, res) => {
    try {
        const newStream = new Stream(req.body);
        const savedStream = await newStream.save();
        res.status(201).json(savedStream);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

// PUT update stream by ID
exports.update = async (req, res) => {
    try {
        const updated = await Stream.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: 'Stream not found' });
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: 'Invalid update data' });
    }
};

// DELETE (soft delete) stream
exports.softDelete = async (req, res) => {
    try {
        const deleted = await Stream.findByIdAndUpdate(req.params.id, { status: 'inactive' }, { new: true });
        if (!deleted) return res.status(404).json({ error: 'Stream not found' });
        res.status(200).json({ message: 'Stream marked as inactive', stream: deleted });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};
