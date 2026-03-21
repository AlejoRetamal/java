const ProductoModel = require('../models/productoModel');

const productoController = {
  getAll: async (req, res) => {
    try {
      const productos = await ProductoModel.getAll();
      res.json(productos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const producto = await ProductoModel.getById(req.params.id);
      if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
      res.json(producto);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

create: async (req, res) => {
  try {
    const { nombre, precio, imagen, categoria_id, descripcion } = req.body.sanitizedInput;
    const id = await ProductoModel.create({ nombre, precio, imagen, categoria_id, descripcion });
    res.status(201).json({ id, nombre, precio, imagen, categoria_id, descripcion });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
},

update: async (req, res) => {
  try {
    const { nombre, precio, imagen, categoria_id, descripcion } = req.body.sanitizedInput;
    const updated = await ProductoModel.update(req.params.id, { nombre, precio, imagen, categoria_id, descripcion });
    if (!updated) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ id: req.params.id, nombre, precio, imagen, categoria_id, descripcion });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
 },

 getByCategoria: async (req, res) => {
  try {
    const productos = await ProductoModel.getByCategoria(req.params.categoria_id);
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
 },
}

module.exports = productoController;