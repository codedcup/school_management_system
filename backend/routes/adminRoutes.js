const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/', adminController.getAll);
router.get('/:id', adminController.getById);
router.post('/', adminController.create); // Always creates role = 'admin'
router.put('/:id', adminController.update);
router.delete('/:id', adminController.softDelete);

module.exports = router;