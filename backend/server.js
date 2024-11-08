require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const trainerRoutes = require('./routes/trainerRoutes');
const pokemonRoutes = require('./routes/pokemonRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Ruta de prueba inicial
app.get('/', (req, res) => {
	res.send('API funcionando :P, yeeih!');
});

app.use('/api/pokemons', pokemonRoutes); 
app.use('/api/trainers', trainerRoutes); 


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

module.exports = app;