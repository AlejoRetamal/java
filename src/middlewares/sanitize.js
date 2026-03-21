function sanitizeInput(req, res, next) {
  try {
    req.body.sanitizedInput = {
      name:  req.body.name,
      email: req.body.email,
    };

    Object.keys(req.body.sanitizedInput).forEach((key) => {
      if (req.body.sanitizedInput[key] === undefined) {
        delete req.body.sanitizedInput[key];
      }
    });

    next();
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

function sanitizeProducto(req, res, next) {
  try {
    req.body.sanitizedInput = {
      nombre:       req.body.nombre,
      precio:       req.body.precio,
      imagen:       req.body.imagen,
      categoria_id: req.body.categoria_id,
      descripcion:  req.body.descripcion,
    };

    Object.keys(req.body.sanitizedInput).forEach((key) => {
      if (req.body.sanitizedInput[key] === undefined) {
        delete req.body.sanitizedInput[key];
      }
    });

    next();
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
} 
  function sanitizeCategoria(req, res, next) {
  try {
    req.body.sanitizedInput = {
      nombre:      req.body.nombre,
    };

    Object.keys(req.body.sanitizedInput).forEach((key) => {
      if (req.body.sanitizedInput[key] === undefined) {
        delete req.body.sanitizedInput[key];
      }
    });

    next();
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

function sanitizeOrden(req, res, next) {
  try {
    req.body.sanitizedInput = {
      nombre:    req.body.nombre,
      apellido:  req.body.apellido,
      email:     req.body.email,
      telefono:  req.body.telefono,
      domicilio: req.body.domicilio,
      ciudad:    req.body.ciudad,
      total:     req.body.total,
      items:     req.body.items,
    };

    Object.keys(req.body.sanitizedInput).forEach((key) => {
      if (req.body.sanitizedInput[key] === undefined) {
        delete req.body.sanitizedInput[key];
      }
    });

    next();
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

module.exports = { sanitizeInput, sanitizeProducto, sanitizeCategoria, sanitizeOrden };