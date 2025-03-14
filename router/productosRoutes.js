const express = require('express');
const router = express.Router();
const BD = require('../database');
var database = BD.pool;

router.post('/productos', (req, res) => {
  const { nombre, tipo, descripcion, imagen_pro, precio, admin_id } = req.body;

  database.query(
    'INSERT INTO productos (nombre, tipo, descripcion, imagen_pro, precio, admin_id) VALUES (?, ?, ?, ?, ?, ?)',
    [nombre, tipo, descripcion, imagen_pro, precio, admin_id],
    (err, result) => {
      if (err) {
        console.error("Error al insertar producto:", err);
        res.status(500).json({ error: "Error al insertar producto" });
      } else {
        res.status(201).json({ comp_id: result.insertId, nombre, tipo, descripcion, imagen_pro, precio, admin_id });
      }
    }
  );
});

router.get('/productos', (req, res) => {
  database.query('SELECT * FROM productos;', (err, rows) => {
    if (err) {
      console.error("Error al obtener productos:", err);
      res.status(500).json({ error: "Error al obtener productos" });
    } else {
      res.json(rows);
    }
  });
});

router.put('/productos/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, tipo, descripcion, imagen_pro, precio, admin_id } = req.body;

  database.query(
    'UPDATE productos SET nombre = ?, tipo = ?, descripcion = ?, imagen_pro = ?, precio = ?, admin_id = ? WHERE comp_id = ?',
    [nombre, tipo, descripcion, imagen_pro, precio, admin_id, id],
    (err, result) => {
      if (err) {
        console.error("Error al actualizar producto:", err);
        res.status(500).json({ error: "Error al actualizar producto" });
      } else {
        // Seleccionar el producto actualizado para devolverlo en la respuesta
        database.query('SELECT * FROM productos WHERE comp_id = ?', [id], (err, rows) => {
          if (err) {
            console.error("Error al obtener el producto actualizado:", err);
            res.status(500).json({ error: "Error al obtener el producto actualizado" });
          } else {
            res.json(rows[0]);
          }
        });
      }
    }
  );
});

router.delete('/productos/:id', (req, res) => {
  const { id } = req.params;
  database.query('DELETE FROM productos WHERE comp_id = ?', [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar producto:", err);
      res.status(500).json({ error: "Error al eliminar producto" });
    } else {
      res.json({ message: "Producto eliminado exitosamente" });
    }
  });
});

module.exports = router;
