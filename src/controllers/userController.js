const UserModel = require('../models/userModel');

const userController = {
  getAll: async (req, res) => {
    try {
      const users = await UserModel.getAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const user = await UserModel.getById(req.params.id);
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const { name, email } = req.body.sanitizedInput;
      const id = await UserModel.create({ name, email });
      res.status(201).json({ id, name, email });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const { name, email } = req.body.sanitizedInput;
      const updated = await UserModel.update(req.params.id, { name, email });
      if (!updated) return res.status(404).json({ message: 'Usuario no encontrado' });
      res.json({ id: req.params.id, name, email });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  remove: async (req, res) => {
    try {
      const deleted = await UserModel.remove(req.params.id);
      if (!deleted) return res.status(404).json({ message: 'Usuario no encontrado' });
      res.json({ message: 'Usuario eliminado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = userController;