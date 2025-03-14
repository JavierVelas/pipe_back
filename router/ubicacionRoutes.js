const express = require('express');
const router = express.Router();
const BD = require('../database');
const multer = require('multer');
var database = BD.pool;

router.post('/ubicacion', (req, res) => {
  const { nombre, direccion, imagen_ubi, admin_id } = req.body;
  database.query(
    'INSERT INTO ubicacion (nombre, direccion, imagen_ubi, admin_id) VALUES (?, ?, ?, ?)',
    [nombre, direccion, imagen_ubi, admin_id],
    (err, result) => {
      if (err) {
        console.error("Error al insertar una nueva ubicación:", err);
        res.status(500).json({ error: "Error al añadir una localización" });
      } else {
        res.status(201).json({ ubi_id: result.insertId, nombre, direccion, imagen_ubi, admin_id });
      }
    }
  );
});

router.get('/ubicacion', (req, res) => {
  database.query('SELECT * FROM ubicacion;', (err, rows) => {
    if (err) {
      console.error("Error al obtener ubicacion:", err);
      res.status(500).json({ error: "Error al obtener ubicacion" });
    } else {
      res.json(rows);
    }
  });
});

router.put('/ubicacion/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, direccion, imagen_ubi, admin_id } = req.body;
  database.query(
    'UPDATE ubicacion SET nombre = ?, direccion = ?, imagen_ubi = ?, admin_id = ? WHERE ubi_id = ?',
    [nombre, direccion, imagen_ubi, admin_id, id],
    (err, result) => {
      if (err) {
        console.error("Error al actualizar ubicacion:", err);
        res.status(500).json({ error: "Error al actualizar ubicacion" });
      } else {
        // Seleccionar la ubicación actualizada para devolverla en la respuesta
        database.query('SELECT * FROM ubicacion WHERE ubi_id = ?', [id], (err, rows) => {
          if (err) {
            console.error("Error al obtener la ubicación actualizada:", err);
            res.status(500).json({ error: "Error al obtener la ubicación actualizada" });
          } else {
            res.json(rows[0]);
          }
        });
      }
    }
  );
});

router.delete('/ubicacion/:id', (req, res) => {
  const { id } = req.params;
  database.query('DELETE FROM ubicacion WHERE ubi_id = ?', [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar Ubicacion:", err);
      res.status(500).json({ error: "Error al eliminar Ubicacion" });
    } else {
      res.json({ message: "Ubicacion eliminado exitosamente" });
    }
  });
});

module.exports = router;
