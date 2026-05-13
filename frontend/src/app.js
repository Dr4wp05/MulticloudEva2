const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configuración del Pool usando variables de entorno
const pool = new Pool({
    host: process.env.DB_HOST || 'erp-database',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'admin_password',
    database: process.env.DB_NAME || 'farmacia_db',
    port: 5432,
});

// Rutas de Vistas
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/productos', (req, res) => res.sendFile(path.join(__dirname, 'views', 'productos.html')));

// API Endpoints
app.get('/api/productos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM productos ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('CRITICAL DATABASE ERROR:', err);
        res.status(500).json({ error: 'Internal Server Error', detail: err.message });
    }
});

app.post('/api/productos', async (req, res) => {
    const { nombre, descripcion, precio } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO productos (nombre, descripcion, precio) VALUES ($1, $2, $3) RETURNING *',
            [nombre, descripcion, precio]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('INSERT ERROR:', err);
        res.status(500).json({ error: 'Failed to save product' });
    }
});

const PORT = 80;
app.listen(PORT, () => console.log(`ERP Farmacia operativo en puerto ${PORT}`));
