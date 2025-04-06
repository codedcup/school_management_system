const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/admin/login', authController.loginAdmin);
router.post('/teacher/login', authController.loginTeacher);
router.post('/student/login', authController.loginStudent);

module.exports = router;
