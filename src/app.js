const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const userRoutes    = require('./routes/users');
const productoRoutes = require('./routes/productos');
const categoriaRoutes = require('./routes/categorias');
const ordenRoutes = require('./routes/ordenes');


app.use('/api/users',    userRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/ordenes', ordenRoutes);
app.use('/uploads', express.static('src/uploads'));

module.exports = app;