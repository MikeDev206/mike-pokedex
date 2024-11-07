const mongoose = require('mongoose');

const TrainerSchema = new mongoose.Schema({
	name: { type: String, required: true },
	lastName: { type: String, required: true },
	phone: { type: String, required: true },
	badges: { type: Number, required: true },
});

module.exports = mongoose.model('Trainer', TrainerSchema);
