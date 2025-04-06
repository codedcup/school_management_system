const express = require('express');
const router = express.Router();
const salaryController = require('../controllers/salaryController');

router.get('/', salaryController.getAll);
router.get('/:id', salaryController.getById);
router.post('/', salaryController.create);
router.put('/:id', salaryController.update);
router.delete('/:id', salaryController.softDelete);

module.exports = router;
