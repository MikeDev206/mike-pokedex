//servidor del back
require('dotenv').config();//esto es para cargar las variables de entorno
const express = require('express');
const connectDB = require('./config/db');

const app = express();

//conectar a la base de datos
connectDB();

//iniciar el middleware
app.use(express.json());

//definir la ruta
app.get('/', (req, res) => {
	res.send('Server funcionando :P, yeeih!');
});


const PORT = process.env.PORT || 5050;
app.listen(PORT,() => {
	console.log(`Server running on port ${PORT}`);
});