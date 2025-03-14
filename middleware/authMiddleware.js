const pool = require('../database');

const authorize = (action) => async (req, res, next) => {
  const { usuario } = req.body;

  if (usuario === 'javier') {
    return next();
  } else {
    return res.status(403).json({ error: 'No tienes permiso para realizar esta acción' });
  }
};

module.exports = authorize;
