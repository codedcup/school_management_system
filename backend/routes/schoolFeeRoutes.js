const express = require('express');
const router = express.Router();
const schoolFeeController = require('../controllers/schoolFeeController');

router.get('/', schoolFeeController.getAll);
router.get('/:id', schoolFeeController.getById);
router.post('/', schoolFeeController.create);
router.put('/:id', schoolFeeController.update);
router.delete('/:id', schoolFeeController.softDelete);

module.exports = router;
