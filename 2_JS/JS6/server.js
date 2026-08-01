const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Score',
    waitForConnections: true,
    connectionLimit: 10
});

app.get('/api/word', (req, res) => {
    const { difficulty } = req.query;
    const allowedDiffs = ['easy', 'medium', 'hard'];
    if (!difficulty || !allowedDiffs.includes(difficulty)) {
        return res.status(400).json({ error: 'Invalid or missing difficulty parameter' });
    }
    db.query('SELECT word FROM words WHERE difficulty = ? ORDER BY RAND() LIMIT 1', [difficulty], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'No words found for this difficulty' });
        res.json({ word: results[0].word.toUpperCase() });
    });
});

app.get('/api/scores', (req, res) => {
    const { search, difficulty, fechaDesde } = req.query;
    
    let query = 'SELECT id, nombre, puntos, tiempo, vidas_restantes, longitud_palabra, dificultad, fecha FROM score';
    let params = [];
    let conditions = [];

    if (search) {
        conditions.push('nombre LIKE ?');
        params.push(`%${search}%`);
    }

    if (difficulty) {
        conditions.push('dificultad = ?');
        params.push(difficulty);
    }

    if (fechaDesde) {
        conditions.push('fecha >= ?');
        params.push(fechaDesde);
    }

    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY puntos DESC, tiempo ASC';

    db.query(query, params, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/api/scores', (req, res) => {
    const { nombre, puntos, tiempo, vidas_restantes, longitud_palabra, dificultad } = req.body;
    if (!nombre || puntos === undefined || tiempo === undefined || vidas_restantes === undefined || longitud_palabra === undefined || !dificultad) {
        return res.status(400).json({ error: 'Missing required body fields' });
    }
    db.query('INSERT INTO score (nombre, puntos, tiempo, vidas_restantes, longitud_palabra, dificultad) VALUES (?, ?, ?, ?, ?, ?)', 
        [nombre, puntos, tiempo, vidas_restantes, longitud_palabra, dificultad], 
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true, id: result.insertId });
        }
    );
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
