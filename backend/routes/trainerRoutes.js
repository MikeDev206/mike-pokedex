const express = require('express');
const router = express.Router();
const {
	getTrainers,
	createTrainer,
	updateTrainer,
	deleteTrainer,
} = require('../controllers/trainerController');

//rutas CRUD para entrenadores
router.get('/', getTrainers);        //obtiene todos los entrenadores
router.post('/', createTrainer);     //crea un nuevo entrenador
router.put('/:id', updateTrainer);   //actualiza un entrenador por ID
router.delete('/:id', deleteTrainer); //elimina un entrenador por ID

module.exports = router;
