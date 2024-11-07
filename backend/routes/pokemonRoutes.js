const express = require('express');
const router = express.Router();
const axios = require('axios');

//ruta para obtener todos los Pokémon con paginación y búsqueda
router.get('/pokemons', async (req, res) => {
	const { limit = 10, page = 1, search } = req.query;
	const offset = (page - 1) * limit;

	try {
		const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
		let pokemons = response.data.results;

		// Filtrar por nombre si se proporciona el parámetro search
		if (search) {
			pokemons = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()));
		}

		// Ordenar alfabéticamente
		pokemons.sort((a, b) => a.name.localeCompare(b.name));

		res.json(pokemons);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error fetching data from PokeAPI' });
	}
});

module.exports = router;