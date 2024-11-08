# mike-pokedex

Pokedex CRUD para pruebas y aprendizaje.

## Descripción del Proyecto

Este proyecto es una Pokedex que consume la [PokeAPI](https://pokeapi.co/docs/v2) y permite gestionar entrenadores de pokémon. Está hecho con Node.js, Express, MongoDB y React.

## Estructura del Proyecto

El proyecto está dividido en dos módulos principales:

- **Módulo Uno**: Consumo de la PokeAPI con paginación, filtros y la opción de descargar un PDF con la lista de pokémons.
- **Módulo Dos**: CRUD de entrenadores con la opción de exportar la lista de entrenadores en formato CSV.

Para detalles específicos del flujo de trabajo, puedes revisar el [Tablero de GitHub Projects](https://github.com/users/MikeDev206/projects/1/views/1?pane=issue&itemId=86258522), donde está organizada cada tarea y su estado.

## Instalación

### Prerrequisitos

- Tener instalado Node.js y npm.
- Tener MongoDB corriendo (puede ser local o en la nube).

### Pasos para instalar

1. **Clona el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```
2. **Backend:** 
   - Ve al directorio del backend e instala las dependencias:
     ```bash
     cd mike-pokedex/backend
     npm install
     ```
   - Crea un archivo `.env` en el directorio `backend` y define las variables de entorno:
     ```plaintext
     PORT=5050
     MONGO_URI=mongodb://localhost:27017/nombreDeTuBD
     ```

3. **Frontend:**
   - Ve al directorio del frontend e instala las dependencias:
     ```bash
     cd ../frontend
     npm install
     ```

### Ejecutar el proyecto

- Para iniciar el **backend**:
  ```bash
  cd backend
  npm start
  ```
- Para iniciar el **frontend**:
  ```bash
  cd ../frontend
  npm run dev
  ```

## Uso de la Aplicación

### Módulo Uno: Pokedex

- Puedes buscar pokémons por nombre usando el campo de búsqueda.
- Navega entre páginas usando los botones de paginación.
- Descarga la lista de pokémons en formato PDF usando el botón "Descargar PDF".

### Módulo Dos: CRUD de Entrenadores

- En la sección de entrenadores, llena el formulario y haz clic en "Agregar" para añadir un nuevo entrenador.
- Cada entrenador listado tiene opciones para "Editar" o "Eliminar".
- Puedes descargar la lista de entrenadores en CSV haciendo clic en "Exportar a CSV".

## Detalles Técnicos de los Módulos

### Módulo Uno: Consumo de PokeAPI, Paginación, Filtros y Generación de PDF

#### Algoritmo:

1. La función `getPokemons` en el backend recibe los parámetros `limit`, `page` y `search`.
2. Construye la URL para hacer la solicitud a la PokeAPI.
   - Si `search` está presente, filtra por nombre en la misma PokeAPI.
3. Hace la solicitud a la PokeAPI.
   - Tiene un `errorHandler` para problemas de conexión o respuestas no válidas.
4. Si la solicitud fue exitosa:
   - Ordena los pokémons alfabéticamente.
   - Aplica paginación según `limit` y `page`.
5. Devuelve solo los datos solicitados al frontend.

### Módulo Dos: CRUD de Entrenadores y Generación de CSV

#### Algoritmo:

1. **Crear un entrenador**:
   - La función `createTrainer` valida los datos (`nombre`, `apellidos`, `telefono`, `medallas`) y guarda en la base de datos si son válidos. Si no, retorna un error.
2. **Listar entrenadores**:
   - `getTrainers` obtiene y ordena alfabéticamente los entrenadores guardados en la base de datos.
3. **Actualizar entrenador**:
   - La función `updateTrainer` valida el ID y los datos nuevos. Si todo está bien, actualiza el registro en la base de datos.
4. **Eliminar entrenador**:
   - `deleteTrainer` valida el ID. Si es correcto, elimina el entrenador de la base de datos.
5. **Exportar a CSV**:
   - En el frontend, hay un botón que convierte la lista de entrenadores en un archivo CSV descargable.

## Dependencias

### Backend

- `express`: Framework de Node.js para construir el servidor y manejar rutas.
- `mongoose`: Para la conexión y el manejo de la base de datos MongoDB.
- `axios`: Para hacer solicitudes HTTP a la PokeAPI.
- `json2csv`: Para la exportación de datos en formato CSV.
- `cors`: Middleware para habilitar CORS.
- `dotenv`: Para manejar variables de entorno.

### Frontend

- `react`: Framework para construir la interfaz de usuario.
- `axios`: Para realizar solicitudes HTTP al backend.
- `jspdf`: Para generar el archivo PDF de los pokémons.

## Estructura de Carpetas

```
mike-pokedex/
│
├── backend/
│   ├── config/
│   │   └── db.js          # Configuración de la conexión a MongoDB
│   ├── models/
│   │   └── Trainer.js     # Modelo de datos para entrenadores
│   ├── routes/
│   │   ├── trainerRoutes.js # Rutas CRUD para entrenadores
│   │   └── pokemonRoutes.js # Ruta para obtener pokémons desde la PokeAPI
│   ├── server.js          # Archivo principal del backend
│   └── .env.example       # Archivo de ejemplo para las variables de entorno
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── TrainerList.jsx # Componente para listar y manejar entrenadores
    │   │   └── PokemonList.jsx # Componente para listar y manejar pokémons
    │   └── App.js             # Componente principal
    ├── vite.config.js         # Configuración de Vite
    └── index.html             # Archivo HTML principal
```

## Contribuciones

Este proyecto está abierto a contribuciones. Si encuentras un problema o tienes una mejora en mente, puedes abrir un _issue_ o enviar un _pull request_.
