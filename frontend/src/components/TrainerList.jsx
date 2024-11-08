import { useEffect, useState } from "react";
import axios from "axios";

const TrainerList = () => {
	const [trainers, setTrainers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [editingTrainer, setEditingTrainer] = useState(null); // Estado para el entrenador en edición
	const [formData, setFormData] = useState({
		name: "",
		lastName: "",
		phone: "",
		badges: 0,
	});

	// Función para obtener entrenadores
	const fetchTrainers = async () => {
		try {
			setIsLoading(true);
			const response = await axios.get("/api/trainers");
			setTrainers(response.data);
		} catch (error) {
			console.error("Error obteniendo entrenadores:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchTrainers();
	}, []);

	//maneja cambios en el formulario
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	//agrega un nuevo entrenador
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("/api/trainers", formData);
			setTrainers([...trainers, response.data]);
			setFormData({ name: "", lastName: "", phone: "", badges: 0 });
		} catch (error) {
			console.error("Error al crear entrenador:", error);
		}
	};

	//actualiza un entrenador existente
	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.put(
				`/api/trainers/${editingTrainer._id}`,
				formData
			);
			setTrainers(
				trainers.map((trainer) =>
					trainer._id === editingTrainer._id ? response.data : trainer
				)
			);
			setEditingTrainer(null); // Finaliza la edición
			setFormData({ name: "", lastName: "", phone: "", badges: 0 });
		} catch (error) {
			console.error("Error al actualizar entrenador:", error);
		}
	};

	//elimina un entrenador
	const deleteTrainer = async (id) => {
		try {
			await axios.delete(`/api/trainers/${id}`);
			setTrainers(trainers.filter((trainer) => trainer._id !== id));
			console.log("Entrenador eliminado");
		} catch (error) {
			console.error("Error al eliminar el entrenador:", error);
		}
	};

	//carga los datos de un entrenador en el formulario para edición
	const startEditTrainer = (trainer) => {
		setEditingTrainer(trainer);
		setFormData({
			name: trainer.name,
			lastName: trainer.lastName,
			phone: trainer.phone,
			badges: trainer.badges,
		});
	};

	//exporta a csv
	const exportToCSV = async () => {
		try {
			const response = await axios.get("/api/trainers/csv", {
				responseType: "blob",
			});
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", "trainers.csv");
			document.body.appendChild(link);
			link.click();
		} catch (error) {
			console.error("Error al exportar a CSV: ", error);
		}
	};

	return (
		<div>
			<h1>Lista de Entrenadores</h1>

			{isLoading ? (
				<p>Cargando entrenadores...</p>
			) : trainers.length > 0 ? (
				<ul>
					{trainers.map((trainer) => (
						<li key={trainer._id}>
							{trainer.name} {trainer.lastName} - Teléfono: {trainer.phone} -
							Medallas: {trainer.badges}
							<button onClick={() => startEditTrainer(trainer)}>Editar</button>
							<button onClick={() => deleteTrainer(trainer._id)}>
								Eliminar
							</button>
						</li>
					))}
				</ul>
			) : (
				<p>Aún no hay entrenadores registrados</p>
			)}

			<button onClick={exportToCSV}>Exportar a CSV</button>

			<h2>
				{editingTrainer ? "Editar Entrenador" : "Agregar Nuevo Entrenador"}
			</h2>
			<form onSubmit={editingTrainer ? handleUpdate : handleSubmit}>
				<input
					type="text"
					name="name"
					placeholder="Nombre"
					value={formData.name}
					onChange={handleInputChange}
					required
				/>
				<input
					type="text"
					name="lastName"
					placeholder="Apellido"
					value={formData.lastName}
					onChange={handleInputChange}
					required
				/>
				<input
					type="tel"
					name="phone"
					placeholder="Teléfono"
					value={formData.phone}
					onChange={handleInputChange}
					required
				/>
				<input
					type="number"
					name="badges"
					placeholder="Medallas"
					value={formData.badges}
					onChange={handleInputChange}
					required
				/>
				<button type="submit">
					{editingTrainer ? "Actualizar" : "Agregar"}
				</button>
				{editingTrainer && (
					<button type="button" onClick={() => setEditingTrainer(null)}>
						Cancelar Edición
					</button>
				)}
			</form>
		</div>
	);
};

export default TrainerList;
