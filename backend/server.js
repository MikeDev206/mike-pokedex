//servidor del back
require('dotenv').config();//esto es para cargar las variables de entorno
const express = require('express');
const connectDB = require('./config/db');
const trainerRoutes = require('./routes/trainerRoutes');
const pokemonRoutes = require('./routes/pokemonRoutes');

const app = express();

//conectar a la base de datos
connectDB();

app.use(express.json());

app.use('/api', pokemonRoutes);

//definir la ruta de prueba
app.get('/', (req, res) => {
	res.send('Server funcionando :P, yeeih!');
});

//ruta de los entrenadores
app.use('/api/trainers', trainerRoutes);


const PORT = process.env.PORT || 5050;
app.listen(PORT,() => {
	console.log(`Server running on port ${PORT}`);
});