const mongoose = require('mongoose');
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log('Mongo connected :)');
	} catch (error) {
		console.error('Mongo connection failed :(', error);
		process.exit(1);// esto termina el proceso si no se conecta a la db
	}
};

module.exports = connectDB;