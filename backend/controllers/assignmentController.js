const Assignment = require('../models/ClassSubjectAssignmentsSchema');

// GET all assignments
exports.getAll = async (req, res) => {
    try {
        const assignments = await Assignment.find()
            .populate('classId')
            .populate('sectionId')
            .populate('streamId')
            .populate('subjectId');
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// GET assignment by ID
exports.getById = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id)
            .populate('classId')
            .populate('sectionId')
            .populate('streamId')
            .populate('subjectId');
        if (!assignment) return res.status(404).json({ error: 'Assignment not found' });
        res.status(200).json(assignment);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// POST create new assignment
exports.create = async (req, res) => {
    try {
        const newAssignment = new Assignment(req.body);
        const saved = await newAssignment.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

// PUT update assignment by ID
exports.update = async (req, res) => {
    try {
        const updated = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: 'Assignment not found' });
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: 'Invalid update data' });
    }
};

// DELETE (soft delete) assignment
exports.softDelete = async (req, res) => {
    try {
        const deleted = await Assignment.findByIdAndUpdate(req.params.id, { status: 'inactive' }, { new: true });
        if (!deleted) return res.status(404).json({ error: 'Assignment not found' });
        res.status(200).json({ message: 'Assignment marked as inactive', assignment: deleted });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};
