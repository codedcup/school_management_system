const express = require('express');
const router = express.Router();
const designationController = require('../controllers/designationController');

router.get('/', designationController.getAll);
router.get('/:id', designationController.getById);
router.post('/', designationController.create);
router.put('/:id', designationController.update);
router.delete('/:id', designationController.softDelete);

module.exports = router;
