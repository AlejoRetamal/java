const CategoriaModel = require('../models/categoriaModel');

const categoriaController = {
  getAll: async (req, res) => {
    try {
      const categorias = await CategoriaModel.getAll();
      res.json(categorias);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const categoria = await CategoriaModel.getById(req.params.id);
      if (!categoria) return res.status(404).json({ message: 'Categoria no encontrada' });
      res.json(categoria);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const { nombre } = req.body.sanitizedInput;
      const id = await CategoriaModel.create({ nombre });
      res.status(201).json({ id, nombre});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = categoriaController;