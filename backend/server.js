require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const trainerRoutes = require('./routes/trainerRoutes');
const pokemonRoutes = require('./routes/pokemonRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Rutas para la API
app.use('/api/pokemons', pokemonRoutes); 
app.use('/api/trainers', trainerRoutes); 

// Ruta de prueba inicial
app.get('/', (req, res) => {
	res.send('Server funcionando :P, yeeih!');
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
