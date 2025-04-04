const express = require('express');
const router = express.Router();
const classTeacherController = require('../controllers/classTeacherController');

router.get('/', classTeacherController.getAll);
router.get('/:id', classTeacherController.getById);
router.post('/', classTeacherController.create);
router.put('/:id', classTeacherController.update);
router.delete('/:id', classTeacherController.softDelete);

module.exports = router;
