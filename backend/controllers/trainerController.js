const Trainer = require('../models/Trainer');

//obtener los entrenadores (todos)
const getTrainers = async (req, res) => {
	try {
		const trainers = await Trainer.find().sort({ name: 1 }); // Ordenar alfabéticamente
		res.json(trainers);
	} catch (error) {
		res.status(500).json({ message: 'Error al obtener entrenadores', error: error.message });
	}
};

//crear nuevo entrenador
const createTrainer = async (req, res) => {
	const { name, lastName, phone, badges } = req.body;
	if (!name || !lastName || !phone || !badges) {
		return res.status(400).json({ message: 'Todos los campos son requeridos' });
	}

	try {
		const newTrainer = new Trainer({ name, lastName, phone, badges });
		await newTrainer.save();
		res.status(201).json(newTrainer);
	} catch (error) {
		res.status(500).json({ message: 'Error al crear entrenador', error: error.message });
	}
};

//actualiza un entrenador
const updateTrainer = async (req, res) => {
	const { id } = req.params;
	const { name, lastName, phone, badges } = req.body;

	try {
		const trainer = await Trainer.findByIdAndUpdate(
			id,
			{ name, lastName, phone, badges },
			{ new: true }
		);
		if (!trainer) return res.status(404).json({ message: 'Entrenador no encontrado' });
		res.json(trainer);
	} catch (error) {
		res.status(500).json({ message: 'Error al actualizar entrenador', error: error.message });
	}
};

//elimina un entrenador
const deleteTrainer = async (req, res) => {
	const { id } = req.params;

	try {
		const trainer = await Trainer.findByIdAndDelete(id);
		if (!trainer) return res.status(404).json({ message: 'Entrenador no encontrado' });
		res.status(204).end();
	} catch (error) {
		res.status(500).json({ message: 'Error al eliminar entrenador', error: error.message });
	}
};

module.exports = {
	getTrainers,
	createTrainer,
	updateTrainer,
	deleteTrainer,
};
