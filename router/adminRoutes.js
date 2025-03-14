const express = require('express');
const router = express.Router();
const pool = require('../database');
const authorize = require('../middleware/authMiddleware');

// Ruta para crear un nuevo admin (sólo Javier puede hacerlo)
router.post('/admin', authorize('create'), async (req, res) => {
  const { usuario, contraseña, rol } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO admin (usuario, contraseña, rol) VALUES (?, ?, ?)',
      [usuario, contraseña, rol]
    );
    res.status(201).json({ admin_id: result.insertId, usuario, rol });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para leer admins (sólo Javier puede hacerlo)
router.get('/admin', authorize('read'), async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM admin');
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para actualizar un admin (sólo Javier puede hacerlo)
router.put('/admin/:id', authorize('update'), async (req, res) => {
  const { id } = req.params;
  const { usuario, contraseña, rol } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE admin SET usuario = ?, contraseña = ?, rol = ? WHERE admin_id = ?',
      [usuario, contraseña, rol, id]
    );
    res.status(200).json({ message: 'Admin actualizado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para eliminar un admin (sólo Javier puede hacerlo)
router.delete('/admin/:id', authorize('delete'), async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM admin WHERE admin_id = ?', [id]);
    res.status(200).json({ message: 'Admin eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
