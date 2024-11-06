## mike-pokedex
**CRUD Pokedex for testing

## Descripción del Proyecto
Este proyecto consiste en una Pokedex que consume la PokeAPI y permite gestionar entrenadores de pokémon.

## Especificaciones
- [Módulo Uno: Consumo de PokeAPI, Paginación, Filtros, y Generación de PDF](#módulo-uno-consumo-de-pokeapi-paginación-filtros-y-generación-de-pdf)
- [Módulo Dos: CRUD de Entrenadores y Generación de CSV](#módulo-dos-crud-de-entrenadores-y-generación-de-csv)


## Arquitectura del Proyecto

### Módulo Uno: Consumo de PokeAPI, Paginación, Filtros y Generación de PDF

Este módulo consume la PokeAPI para obtener una lista de pokémons y permite realizar búsquedas y aplicar paginación.

#### Algoritmo del Módulo Uno

1. Crear una función `getPokemons` que reciba `limit`, `page` y `search`.
2. Construir la URL de solicitud a la PokeAPI.
   - Si `search` está presente, filtrar los resultados por nombre.
3. Realizar la solicitud HTTP a la PokeAPI.
4. Ordenar el array alfabéticamente.
5. Aplicar paginación según `limit` y `page`.
6. Manejar errores para notificar si la API no responde o si hay datos inválidos.

---

### Módulo Dos: CRUD de Entrenadores y Generación de CSV

Este módulo permite gestionar entrenadores en una base de datos y ofrece la opción de exportar la lista en formato CSV.

#### Algoritmo del Módulo Dos

1. Crear una función `createTrainer` en el backend para recibir datos de un nuevo entrenador y validarlos.
   - Guardar en la base de datos si los datos son válidos; si no, devolver un mensaje de error.
2. Crear una función `getTrainers` para obtener y listar entrenadores desde la base de datos.
3. Crear una función `updateTrainer` que reciba un ID de entrenador y nuevos datos para actualizar.
   - Validar los datos y actualizar solo si son correctos.
4. Crear una función `deleteTrainer` que reciba un ID de entrenador y lo elimine de la base de datos.
5. En el frontend, crear un botón que llame a cada función CRUD y permita la interacción con el backend.
6. Crear un botón de exportación a CSV en el frontend.
   - Al hacer clic, se llama a `getTrainers`, y la respuesta se convierte en un archivo CSV descargable.
