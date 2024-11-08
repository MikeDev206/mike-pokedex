import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

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

	//funcion para el pdf
	const handleDownload = () => {
		const doc = new jsPDF();
		doc.text("Lista de Pokemons", 20, 10);
		pokemons.forEach((pokemon, index) => {
			doc.text(`${index + 1}. ${pokemon.name}`, 20, 20 + index * 10);
		});
		doc.save("pokemons.pdf");
	}

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

			<button onClick={handleDownload}>Descargar PDF</button>

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
