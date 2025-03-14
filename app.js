const express = require('express');
const cors = require('cors'); // Importa el paquete cors


const app = express();



const authRoutes = require('./router/authRoutes');
const adminRoutes = require('./router/adminRoutes');
const productosRoutes = require('./router/productosRoutes');
const ubicacionRoutes = require('./router/ubicacionRoutes');
const feedRoutes = require('./router/feedRoutes');

app.use(cors());
app.use(express.json());



app.use('/auth', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', productosRoutes);
app.use('/api', ubicacionRoutes);
app.use('/api', feedRoutes);





module.exports = app;
