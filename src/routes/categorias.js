const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const { sanitizeCategoria } = require('../middlewares/sanitize');

router.get('/',     categoriaController.getAll);
router.get('/:id',  categoriaController.getById);
router.post('/',    sanitizeCategoria, categoriaController.create);

module.exports = router;