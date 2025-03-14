const express = require('express');
const router = express.Router();
const BD = require('../database');
var database = BD.pool;

// Ruta para insertar feedback
router.post('/feedback', (req, res) => {
  const { titulo, texto, admin_id } = req.body;
  database.query(
    'INSERT INTO feedback (titulo, texto, admin_id) VALUES (?, ?, ?)',
    [titulo, texto, admin_id],
    (err, result) => {
      if (err) {
        console.error("Error al insertar un nuevo feedback:", err);
        res.status(500).json({ error: "Error al añadir un feedback" });
      } else {
        res.status(201).json({ fb_id: result.insertId, titulo, texto, admin_id });
      }
    }
  );
});

// Ruta para obtener todos los feedback
router.get('/feedback', (req, res) => {
  database.query('SELECT * FROM feedback;', (err, rows) => {
    if (err) {
      console.error("Error al obtener feedback:", err);
      res.status(500).json({ error: "Error al obtener feedback" });
    } else {
      res.json(rows);
    }
  });
});

// Ruta para actualizar un feedback
router.put('/feedback/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, texto, admin_id } = req.body;
  database.query(
    'UPDATE feedback SET titulo = ?, texto = ?, admin_id = ? WHERE fb_id = ?',
    [titulo, texto, admin_id, id],
    (err, result) => {
      if (err) {
        console.error("Error al actualizar feedback:", err);
        res.status(500).json({ error: "Error al actualizar feedback" });
      } else {
        // Seleccionar el feedback actualizado para devolverlo en la respuesta
        database.query('SELECT * FROM feedback WHERE fb_id = ?', [id], (err, rows) => {
          if (err) {
            console.error("Error al obtener el feedback actualizado:", err);
            res.status(500).json({ error: "Error al obtener el feedback actualizado" });
          } else {
            res.json(rows[0]);
          }
        });
      }
    }
  );
});

// Ruta para eliminar un feedback
router.delete('/feedback/:id', (req, res) => {
  const { id } = req.params;
  database.query('DELETE FROM feedback WHERE fb_id = ?', [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar feedback:", err);
      res.status(500).json({ error: "Error al eliminar feedback" });
    } else {
      res.json({ message: "feedback eliminado exitosamente" });
    }
  });
});

module.exports = router;
