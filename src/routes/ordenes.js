const express = require('express');
const router = express.Router();
const ordenController = require('../controllers/ordenController');
const { sanitizeOrden } = require('../middlewares/sanitize');
const { adminAuth } = require('../middlewares/adminAuth');
const upload = require('../config/upload');

router.post('/',                    sanitizeOrden, ordenController.create);
router.get('/admin',                adminAuth, ordenController.getAll);
router.get('/:id',                  ordenController.getById);
router.patch('/:id/estado',         adminAuth, ordenController.updateEstado);
router.post('/:id/comprobante',     upload.single('comprobante'), ordenController.subirComprobante);

module.exports = router;