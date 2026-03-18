const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const userRoutes    = require('./routes/users');
const productoRoutes = require('./routes/productos');
const categoriaRoutes = require('./routes/categorias');

app.use('/api/users',    userRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/categorias', categoriaRoutes);

module.exports = app;