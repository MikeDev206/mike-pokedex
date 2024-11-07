const Trainer = require('../models/Trainer');

//obtiene todos los entrenadores
const getTrainers = async (req, res) => {
	try {
		const trainers = await Trainer.find().sort({ name: 1 });
		res.json(trainers);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener los entrenadores' });
	}
};

//crea un nuevo entrenador
const createTrainer = async (req, res) => {
	try {
		const trainer = new Trainer(req.body);
		await trainer.save();
		res.status(201).json(trainer);
	} catch (error) {
		res.status(400).json({ error: 'Falló crear un entrenador' });
	}
};

//actualiza un entrenador por ID
const updateTrainer = async (req, res) => {
	try {
		const { id } = req.params;
		const trainer = await Trainer.findByIdAndUpdate(id, req.body, { new: true });
		if (!trainer) {
			return res.status(404).json({ error: 'Entrenador no encontrado' });
		}
		res.json(trainer);
	} catch (error) {
		res.status(400).json({ error: 'No se pudo actualizar el entrenador' });
	}
};

//eliminar un entrenador por ID
const deleteTrainer = async (req, res) => {
	try {
		const { id } = req.params;
		const trainer = await Trainer.findByIdAndDelete(id);
		if (!trainer) {
			return res.status(404).json({ error: 'Entrenador no encontrado' });
		}
		res.json({ message: 'Entrenador eliminado' });
	} catch (error) {
		res.status(400).json({ error: 'No se pudo eliminar el entrenador' });
	}
};

module.exports = {
	getTrainers,
	createTrainer,
	updateTrainer,
	deleteTrainer,
};
