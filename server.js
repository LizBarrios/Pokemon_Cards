const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const users = []; // Esto debería ser una base de datos en producción
const secretKey = 'your_secret_key';

// Ruta de registro
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    users.push({ username, password, favorites: [] });
    res.status(201).send('Usuario registrado');
});

// Ruta de login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Credenciales incorrectas');
    }
});

// Middleware de autenticación
const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(403).send('Token inválido');
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        res.status(403).send('Token no proporcionado');
    }
};

// Ruta para agregar a favoritos
app.post('/favorites', authenticate, (req, res) => {
    const { pokemon } = req.body;
    const user = users.find(u => u.username === req.user.username);
    if (user) {
        user.favorites.push(pokemon);
        res.send('Pokémon agregado a favoritos');
    } else {
        res.status(404).send('Usuario no encontrado');
    }
});

// Ruta para obtener favoritos
app.get('/favorites', authenticate, (req, res) => {
    const user = users.find(u => u.username === req.user.username);
    if (user) {
        res.json(user.favorites);
    } else {
        res.status(404).send('Usuario no encontrado');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});