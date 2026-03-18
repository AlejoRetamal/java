const pool = require('../config/db');

const CategoriaModel = {
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM categorias');
    return rows;
  },

  getById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM categorias WHERE id = ?', [id]);
    return rows[0];
  },

  create: async ({ nombre }) => {
    const [result] = await pool.query(
      'INSERT INTO categorias (nombre) VALUES (?)',
      [nombre]
    );
    return result.insertId;
  },
};

module.exports = CategoriaModel;