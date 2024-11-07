const express = require('express');
const router = express.Router();
const {
	getTrainers,
	createTrainer,
	updateTrainer,
	deleteTrainer,
} = require('../controllers/trainerController');

// Rutas CRUD para entrenadores
router.get('/trainers', getTrainers);       // Obtener todos los entrenadores
router.post('/trainers', createTrainer);    // Crear un nuevo entrenador
router.put('/trainers/:id', updateTrainer); // Actualizar un entrenador por ID
router.delete('/trainers/:id', deleteTrainer); // Eliminar un entrenador por ID

module.exports = router;
