const mongoose = require('mongoose');

const TrainerSchema = new mongoose.Schema({
	name: { type: String, required: true },
	lastName: { type: String, required: true },
	phone: { type: Number, required: true },
	badges: { type: Number, required: true },
});

module.exports = mongoose.model('Trainer', TrainerSchema);
