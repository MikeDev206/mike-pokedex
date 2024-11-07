require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const trainerRoutes = require('./routes/trainerRoutes');
const pokemonRoutes = require('./routes/pokemonRoutes');

const app = express();
connectDB();

app.use(express.json());

// Rutas para la API
app.use('/api/pokemons', pokemonRoutes); // Rutas para pokemons
app.use('/api/trainers', trainerRoutes); // Rutas para entrenadores

// Ruta de prueba inicial
app.get('/', (req, res) => {
	res.send('Server funcionando :P, yeeih!');
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
