const Salary = require('../models/salarySchema');

// GET all salaries
exports.getAll = async (req, res) => {
    try {
        const salaries = await Salary.find();
        res.status(200).json(salaries);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// GET salary by ID
exports.getById = async (req, res) => {
    try {
        const salary = await Salary.findById(req.params.id);
        if (!salary) return res.status(404).json({ error: 'Salary not found' });
        res.status(200).json(salary);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// POST create new salary record
exports.create = async (req, res) => {
    try {
        const newSalary = new Salary(req.body);
        const savedSalary = await newSalary.save();
        res.status(201).json(savedSalary);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

// PUT update salary by ID
exports.update = async (req, res) => {
    try {
        const updated = await Salary.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: 'Salary not found' });
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: 'Invalid update data' });
    }
};

// DELETE (soft delete) salary
exports.softDelete = async (req, res) => {
    try {
        const deleted = await Salary.findByIdAndUpdate(req.params.id, { status: 'inactive' }, { new: true });
        if (!deleted) return res.status(404).json({ error: 'Salary not found' });
        res.status(200).json({ message: 'Salary marked as inactive', salary: deleted });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};
