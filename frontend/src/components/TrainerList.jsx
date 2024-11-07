import { useEffect, useState } from "react";
import axios from "axios";

const TrainerList = () => {
	const [trainers, setTrainers] = useState([]);

	useEffect(() => {
		axios.get("/api/trainers")
			.then(response => {setTrainers(response.data);
				console.log('Entrenadores obtenidos: ',response.data);
			})
			.catch(error => {
				console.error('Error obteniendo entrenadores: ', error);
			});
	}, []);

	return (
		<>
			<h1>Lista de Entrenadores</h1>
			{trainers.length > 0 ? (
				<ul>
					{trainers.map((trainer) => (
						<li key={trainer._id}>
							{trainer.name} {trainer.lastName} - Teléfono: {trainer.phone} -
							Medallas: {trainer.badges}
						</li>
					))}
				</ul>
			) : (
				<p>Aún no hay entrenadores registrados</p>
			)}
		</>
	);
}

export default TrainerList;