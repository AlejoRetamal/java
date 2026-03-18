const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const { sanitizeProducto } = require('../middlewares/sanitize');

router.get('/',     productoController.getAll);
router.get('/:id',  productoController.getById);
router.post('/',    sanitizeProducto, productoController.create);

module.exports = router;