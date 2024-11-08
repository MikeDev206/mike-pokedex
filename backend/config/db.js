const mongoose = require('mongoose');
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.log('Connected to MongoDB');
	} catch (error) {
		console.error('Mongo connection failed :(', error);
		process.exit(1); // Termina el proceso si no se conecta a la DB
	}
};

module.exports = connectDB;
