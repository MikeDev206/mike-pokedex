## mike-pokedex
CRUD Pokedex for testing

## Descripción del Proyecto
Este proyecto consiste en una Pokedex que consume la PokeAPI y permite gestionar entrenadores de pokémon.

## Especificaciones
- [Módulo Uno: Consumo de PokeAPI, Paginación, Filtros, y Generación de PDF](#módulo-uno-consumo-de-pokeapi-paginación-filtros-y-generación-de-pdf)
- [Módulo Dos: CRUD de Entrenadores y Generación de CSV](#módulo-dos-crud-de-entrenadores-y-generación-de-csv)

Para seguir el flujo de trabajo del proyecto, visita el [Tablero de GitHub Projects](https://github.com/users/MikeDev206/projects/1/views/1?pane=issue&itemId=86258522).

## Arquitectura del Proyecto

### Módulo Uno: Consumo de PokeAPI, Paginación, Filtros y Generación de PDF

Este módulo consume la PokeAPI para obtener una lista de pokémons y permite realizar búsquedas y aplicar paginación.

#### Algoritmo del Módulo Uno

1. Crear una función `getPokemons` que reciba `limit`, `page` y `search`.
2. Construir la URL de solicitud a la PokeAPI.
   - Si `search` está presente, pasa el parámetro `search` para filtrar por nombre directamente en la PokeAPI.
3. Realizar la solicitud HTTP a la PokeAPI.
   - Implementar un `errorHandler` para posibles problemas de conexión o respuestas inválidas.
5. Verificar que la solicitud fue exitosa.
6. Ordenar alfabéticamente el array de pokemons
7. Aplicar paginación según `limit` y `page`.
8. Retornar solo el conjunto de datos especificado/solicitado.
9. Manejar errores para notificar si la API no responde o si hay datos inválidos.

---

### Módulo Dos: CRUD de Entrenadores y Generación de CSV

Este módulo permite gestionar entrenadores en una base de datos y ofrece la opción de exportar la lista en formato CSV.

#### Algoritmo del Módulo Dos

1. Crear una función `createTrainer`.
   - Validar datos del entrenador (`nombre`, `apellidos`, `telefono`, `medallas`).
   - Guardar en la base de datos si los datos son válidos; si no, devolver un mensaje de error.
2. Crear una función `getTrainers` para obtener y listar entrenadores desde la base de datos.
3. Imprimir en el frontend alfabeticamente.
4. Crear una función `updateTrainer`.
   - Validar que el ID y los nuevos datos sean válidos.
   - Si los datos son válidos, actualizar el entrenador en la base de datos; si no, devolver un mensaje de error.
5. Crear una función `deleteTrainer`.
   - Validar que el ID del entrenador sea válido.
   - Si el ID es válido, eliminar el entrenador de la base de datos; si no, retornar un mensaje de error.
7. En el frontend, crear un botón que llame a cada función CRUD y permita la interacción con el backend.
8. Crear un botón de exportación a CSV en el frontend.
   - Al hacer clic, se llama a `getTrainers`, y la respuesta se convierte en un archivo CSV descargable.
