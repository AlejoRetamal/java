const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { sanitizeInput } = require('../middlewares/sanitize');

router.get('/',     userController.getAll);
router.get('/:id',  userController.getById);
router.post('/',    sanitizeInput, userController.create);
router.put('/:id',  sanitizeInput, userController.update);
router.delete('/:id', userController.remove);

module.exports = router;