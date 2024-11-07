const express = require('express');
const router = express.Router();
const {
	getTrainers,
	createTrainer,
	updateTrainer,
	deleteTrainer,
} = require('../controllers/trainerController');

//rutas CRUD para entrenadores
router.get('/', getTrainers);       // Obtener todos los entrenadores
router.post('/', createTrainer);    // Crear un nuevo entrenador
router.put('/:id', updateTrainer);  // Actualizar un entrenador por ID
router.delete('/:id', deleteTrainer); // Eliminar un entrenador por ID

module.exports = router;
