const pool = require('../config/db');

const ProductoModel = {
  getAll: async () => {
    const [rows] = await pool.query(`
      SELECT p.*, c.nombre AS categoria
      FROM productos p
      LEFT JOIN categorias c ON p.categoria_id = c.id
    `);
    return rows;
  },

  getById: async (id) => {
    const [rows] = await pool.query(`
      SELECT p.*, c.nombre AS categoria
      FROM productos p
      LEFT JOIN categorias c ON p.categoria_id = c.id
      WHERE p.id = ?
    `, [id]);
    return rows[0];
  },

  create: async ({ nombre, precio, imagen, categoria_id, descripcion }) => {
    const [result] = await pool.query(
      'INSERT INTO productos (nombre, precio, imagen, categoria_id, descripcion) VALUES (?, ?, ?, ?, ?)',
      [nombre, precio, imagen, categoria_id, descripcion]
    );
    return result.insertId;
  },

  update: async (id, { nombre, precio, imagen, categoria_id, descripcion }) => {
    const [result] = await pool.query(
      'UPDATE productos SET nombre=?, precio=?, imagen=?, categoria_id=?, descripcion=? WHERE id=?',
      [nombre, precio, imagen, categoria_id, descripcion, id]
    );
    return result.affectedRows > 0;
  },

  remove: async (id) => {
    const [result] = await pool.query('DELETE FROM productos WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },
};

module.exports = ProductoModel;