import { useEffect, useState } from "react";
import axios from "axios";

const PokemonList = () => {
	const [pokemons, setPokemons] = useState([]);
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [isLastPage, setIsLastPage] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get(`/api/pokemons?limit=${limit}&page=${page}&search=${search}`)
			.then((response) => {
				setPokemons(response.data);
				setIsLastPage(response.data.length < limit);
				console.log("Pokemons obtenidos: ", response.data);
			})
			.catch((error) => {
				console.error("Hubo un error obteniendo los pokemons 🥺 ", error);
			}) 
			.finally(() => {
				setLoading(false);
			});
	}, [limit, page, search]);

	return (
		<>
			<h1>Lista de Pokemons</h1>
			<input
        type="text"
        placeholder="Buscar pokémon"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />
			<div>
				<label>
					Pokemons por página: 
					<select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
						<option value={10}>10</option>
						<option value={20}>20</option>
						<option value={50}>50</option>
					</select>
				</label>
			</div>

			{loading ? (
				<p>Cargando pokemons...</p>
			) : pokemons.length > 0 ? (
				<ul>
					{pokemons.map((pokemon, index) => (
						<li key={index}>{pokemon.name}</li>
					))}
				</ul>
			) : (
				<p>No hay pokemons para mostrar.</p>
			)}
			
			<button onClick={() => setPage(page - 1)} disabled={page === 1}>
				Anterior
			</button>
			<button onClick={() => setPage(page + 1)} disabled={isLastPage}>
				Siguiente
			</button>
		</>
	);
};

export default PokemonList;
