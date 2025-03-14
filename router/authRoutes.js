const express = require('express');
const router = express.Router();
const BD = require('../database'); // Asegúrate de que esta ruta es correcta
var database = BD.pool;

router.post('/login', (req, res) => {
    console.log(req.body);
    const { usuario, contrasena } = req.body;

    console.log('Credenciales recibidas:', { usuario, contrasena });

    database.query('SELECT * FROM admin WHERE usuario = ? AND contraseña = ?;', [usuario, contrasena], (error, rows) => {
        if (error) {
            console.error('Error en la consulta a la base de datos:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        
        if (rows.length > 0) {
            console.log('Usuario encontrado:', rows);
            return res.json({ success: true, user: rows[0] });
        } else {
            console.log('Credenciales inválidas');
            return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
        }
    });
});

module.exports = router;
