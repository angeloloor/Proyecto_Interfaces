// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authenticateToken = require('./middleware/auth');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Configurar conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '125879ja',
  database: 'music_app'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos.');
});

// Configurar la clave secreta para JWT
const ACCESS_TOKEN_SECRET = 'your-secret-key';

// Endpoint para registrar un nuevo usuario
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) throw err;
    connection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (err, results) => {
      if (err) throw err;
      res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    });
  });
});

// Endpoint para iniciar sesión
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) throw err;
    if (results.length === 0) return res.status(400).json({ message: 'Usuario no encontrado' });
    
    const user = results[0];
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) throw err;
      if (!match) return res.status(400).json({ message: 'Contraseña incorrecta' });

      const token = jwt.sign({ user_id: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  });
});

// Endpoint para obtener la playlist del usuario
app.get('/playlist', authenticateToken, (req, res) => {
  const user_id = req.user.user_id;
  connection.query('SELECT * FROM playlists WHERE user_id = ?', [user_id], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Endpoint para agregar una canción a la playlist
app.post('/playlist', authenticateToken, (req, res) => {
  const { song, artist } = req.body;
  const user_id = req.user.user_id;
  connection.query('INSERT INTO playlists (user_id, song, artist) VALUES (?, ?, ?)', [user_id, song, artist], (err, results) => {
    if (err) throw err;
    res.status(201).json({ id: results.insertId, song, artist });
  });
});

// Endpoint para eliminar una canción de la playlist
app.delete('/playlist/:id', authenticateToken, (req, res) => {
  const songId = parseInt(req.params.id);
  const user_id = req.user.user_id;
  connection.query('DELETE FROM playlists WHERE id = ? AND user_id = ?', [songId, user_id], (err, results) => {
    if (err) throw err;
    res.status(204).end();
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
