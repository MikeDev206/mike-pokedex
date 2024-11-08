const express = require('express');
const router = express.Router();
const Trainer = require('../models/Trainer');
const { Parser } = require('json2csv');

router.get('/csv', async (req, res) => {
	try {
		const trainers = await Trainer.find();
		const fields = ['name', 'lastName', 'phone', 'badges'];
		const json2csvParser = new Parser({ fields });
		const csv = json2csvParser.parse(trainers);

		res.header('Content-Type', 'text/csv');
		res.attachment('trainers.csv');
		res.send(csv);
	} catch (error) {
		res.status(500).json({ error: 'Error al generar el archivo CSV de entrenadores' });
	}
});

router.post('/', async (req, res) => {
	try {
		const trainer = new Trainer(req.body);
		await trainer.save();
		res.status(201).json(trainer);
	} catch (error) {
		res.status(400).json({ error: 'Falló la creación del entrenador' });
	}
});

router.get('/', async (req, res) => {
	try {
		const trainers = await Trainer.find().sort({ name: 1 });
		res.json(trainers);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener los entrenadores' });
	}
});

router.put('/:id', async (req, res) => {
	try {
		const trainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true });
		res.json(trainer);
	} catch (error) {
		res.status(404).json({ error: 'Entrenador no encontrado' });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		await Trainer.findByIdAndDelete(req.params.id);
		res.json({ message: 'Entrenador eliminado' });
	} catch (error) {
		res.status(404).json({ error: 'Error al eliminar el entrenador' });
	}
});

module.exports = router;
