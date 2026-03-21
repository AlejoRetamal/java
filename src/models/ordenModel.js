const pool = require('../config/db');

const OrdenModel = {
  create: async ({ nombre, apellido, email, telefono, domicilio, ciudad, total, items }) => {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      const [result] = await conn.query(
        'INSERT INTO ordenes (nombre, apellido, email, telefono, domicilio, ciudad, total) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [nombre, apellido, email, telefono, domicilio, ciudad, total]
      );

      const ordenId = result.insertId;

      for (const item of items) {
        await conn.query(
          'INSERT INTO orden_items (orden_id, producto_id, nombre, precio, cantidad) VALUES (?, ?, ?, ?, ?)',
          [ordenId, item.producto.id, item.producto.nombre, item.producto.precio, item.cantidad]
        );
      }

      await conn.commit();
      return ordenId;
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  },

  getById: async (id) => {
    const [orden] = await pool.query('SELECT * FROM ordenes WHERE id = ?', [id]);
    const [items] = await pool.query('SELECT * FROM orden_items WHERE orden_id = ?', [id]);
    return { ...orden[0], items };
  },

  getAll: async () => {
  const [ordenes] = await pool.query('SELECT * FROM ordenes ORDER BY created_at DESC');
  for (const orden of ordenes) {
    const [items] = await pool.query('SELECT * FROM orden_items WHERE orden_id = ?', [orden.id]);
    orden.items = items;
  }
  return ordenes;
  },

  updateEstado: async (id, estado) => {
    const [result] = await pool.query(
    'UPDATE ordenes SET estado = ? WHERE id = ?',
    [estado, id]
  );
  return result.affectedRows > 0;
  },

  updateComprobante: async (id, comprobante) => {
  const [result] = await pool.query(
    'UPDATE ordenes SET comprobante = ? WHERE id = ?',
    [comprobante, id]
  );
  return result.affectedRows > 0;
},
};

module.exports = OrdenModel;