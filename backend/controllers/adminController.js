const Admin = require('../models/adminSchema');
const { hashPassword } = require('../utils/cryptoUtil');

// GET all admins
exports.getAll = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// GET admin by ID
exports.getById = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) return res.status(404).json({ error: 'Admin not found' });
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// POST create new admin (force role to "admin")
exports.create = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await hashPassword(password);

        // Role is forced to "admin", even if user tries to pass "SuperAdmin"
        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword,
            role: "admin"
        });

        const saved = await newAdmin.save();
        const savedAdmin = saved.toObject();
        delete savedAdmin.password;
        res.status(201).json(savedAdmin);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data or duplicate entry' });
    }
};

// PUT update admin by ID
exports.update = async (req, res) => {
    try {
        const { role, ...updateData } = req.body;

        // Prevent changing role to "SuperAdmin"
        if (role === "SuperAdmin") {
            return res.status(403).json({ error: 'Not allowed to set role to SuperAdmin' });
        }

        const updated = await Admin.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updated) return res.status(404).json({ error: 'Admin not found' });
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: 'Invalid update data' });
    }
};

// DELETE admin
exports.softDelete = async (req, res) => {
    try {
        const deleted = await Admin.findByIdAndUpdate(req.params.id, { status: "inactive" }, { new: true });
        if (!deleted) return res.status(404).json({ error: 'Admin not found' });
        res.status(200).json({ message: 'Admin deleted', admin: deleted });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};
