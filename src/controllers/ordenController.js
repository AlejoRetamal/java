const OrdenModel = require('../models/ordenModel');
const { enviarMailOrden } = require('../services/mailService');

const ordenController = {
  create: async (req, res) => {
    try {
      const { nombre, apellido, email, telefono, domicilio, ciudad, total, items } = req.body.sanitizedInput;
      const id = await OrdenModel.create({ nombre, apellido, email, telefono, domicilio, ciudad, total, items });
      const orden = await OrdenModel.getById(id);

      enviarMailOrden(orden).catch(err =>
        console.error('Error enviando mail:', err.message)
      );

      res.status(201).json(orden);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const orden = await OrdenModel.getById(req.params.id);
      if (!orden) return res.status(404).json({ message: 'Orden no encontrada' });
      res.json(orden);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAll: async (req, res) => {
  try {
    const ordenes = await OrdenModel.getAll();
    res.json(ordenes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
},

updateEstado: async (req, res) => {
  try {
    const { estado } = req.body;
    const updated = await OrdenModel.updateEstado(req.params.id, estado);
    if (!updated) return res.status(404).json({ message: 'Orden no encontrada' });
    res.json({ message: 'Estado actualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
},

subirComprobante: async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No se subió ningún archivo' });
    const comprobante = req.file.filename;
    await OrdenModel.updateComprobante(req.params.id, comprobante);
    res.json({ message: 'Comprobante subido', comprobante });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
},

};

module.exports = ordenController;