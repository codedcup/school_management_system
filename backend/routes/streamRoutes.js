const express = require('express');
const router = express.Router();
const streamController = require('../controllers/streamController');

router.get('/', streamController.getAll);
router.get('/:id', streamController.getById);
router.post('/', streamController.create);
router.put('/:id', streamController.update);
router.delete('/:id', streamController.softDelete);

module.exports = router;
