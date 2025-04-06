const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');

router.get('/', assignmentController.getAll);
router.get('/:id', assignmentController.getById);
router.post('/', assignmentController.create);
router.put('/:id', assignmentController.update);
router.delete('/:id', assignmentController.softDelete);

module.exports = router;
