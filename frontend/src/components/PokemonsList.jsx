import { useEffect, useState } from "react";
import axios from "axios";

const PokemonList = () => {
	const [pokemons, setPokemons] = useState([]);

	useEffect(() => {
		axios
			.get("/api/pokemons")
			.then((response) => {
				setPokemons(response.data);
				console.log("Pokemons obtenidos: ", response.data);
			})
			.catch((error) => {
				console.error("Hubo un error obteniendo los pokemons: ", error);
			});
	}, []);

	return (
		<div>
			<h1>Lista de Pokemons</h1>
			{pokemons.length > 0 ? (
				<ul>
					{pokemons.map((pokemon, index) => (
						<li key={index}>{pokemon.name}</li>
					))}
				</ul>
			) : (
				<p>No hay pokemons disponibles o la conexión falló.</p>
			)}
		</div>
	);
};

export default PokemonList;
