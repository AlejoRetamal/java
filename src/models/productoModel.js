const pool = require('../config/db');

const ProductoModel = {
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM productos');
    return rows;
  },

  getById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
    return rows[0];
  },

  create: async ({ nombre, precio, imagen, categoria, descripcion }) => {
    const [result] = await pool.query(
      'INSERT INTO productos (nombre, precio, imagen, categoria, descripcion) VALUES (?, ?, ?, ?, ?)',
      [nombre, precio, imagen, categoria, descripcion]
    );
    return result.insertId;
  },
};

module.exports = ProductoModel;