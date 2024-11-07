const express = require('express');
const router = express.Router();
const axios = require('axios');

const fetchPokemons = async (limit, offset, search) => {
	const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
	let pokemons = response.data.results;

	if (search) {
		pokemons = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()));
	}
	return pokemons.sort((a, b) => a.name.localeCompare(b.name));
}

//ruta para obtener todos los Pokémon con paginación y búsqueda
router.get('/pokemons', async (req, res) => {
	const { limit = 10, page = 1, search } = req.query;
	const offset = (page - 1) * limit;

	//valida que limit y page sean números
	if (Number.isNaN(Number(limit)) || Number.isNaN(Number(page)) || limit <= 0 || page <= 0) {
		return res.status(400).json({ error: 'Parámetro inválido' });
	}

	try {
		const pokemons = await fetchPokemons(limit, offset, search);
		res.json(pokemons);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error al obtener datos de la PokeAPI 🤔' });
	}
});

module.exports = router;
